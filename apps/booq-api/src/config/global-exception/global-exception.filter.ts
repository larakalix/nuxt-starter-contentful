// src/common/filters/global-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERRORS } from './errors';

interface PostgresErrorLike {
  code?: string;
  constraint?: string;
  table?: string;
  detail?: string;
  cause?: unknown;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.url;
    const method = request.method;

    // HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      if (status >= 400 && status < 500) {
        this.logger.error({
          status,
          method,
          path,
          message: res,
          error: 'HTTP_EXCEPTION',
        });
      }

      return response.status(status).json({
        statusCode: status,
        path: request.url,
        ...(typeof res === 'string' ? { message: res } : res),
      });
    }

    // Postgres / Drizzle errors
    const pgError = this.extractPostgresError(exception);

    if (pgError) {
      const pgCode = pgError.code as keyof typeof ERRORS.postgres;
      const catalog = ERRORS.postgres[pgCode];

      if (catalog) {
        const rule =
          (pgError.constraint &&
            catalog[pgError.constraint as keyof typeof catalog]) ||
          catalog.default;

        this.logger.error({
          event: rule.event,
          code: pgError.code,
          constraint: pgError.constraint,
          table: pgError.table,
          path,
          method,
        });

        return response.status(rule.statusCode).json({
          statusCode: rule.statusCode,
          error: rule.error,
          message: rule.message,
          path,
        });
      }

      this.logger.error({
        event: 'DB_ERROR_UNMAPPED',
        code: pgError.code,
        constraint: pgError.constraint,
        table: pgError.table,
        path,
      });

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Database error',
        path,
      });
    }

    this.logger.error(
      {
        event: 'UNHANDLED_EXCEPTION',
        path,
        method,
      },
      exception instanceof Error ? exception.stack : undefined,
    );

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      path: request.url,
    });
  }

  private extractPostgresError(error: unknown): PostgresErrorLike | null {
    if (typeof error !== 'object' || error === null) return null;

    if ('code' in error) {
      return error as PostgresErrorLike;
    }

    if ('cause' in error) {
      return this.extractPostgresError(error?.cause);
    }

    return null;
  }
}
