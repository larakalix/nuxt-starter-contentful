import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { eq } from 'drizzle-orm';
import { DrizzleDB } from '../db/types/drizzle';
import { hashApiKey } from '../utils/guard.utils';
import * as schema from '../db/schema/schema';
import { DRIZZLE } from '../db/drizzle.module';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: DrizzleDB,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const apiKey = req.headers['bq-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
      throw new ForbiddenException('API key required');
    }

    const keyHash = hashApiKey(apiKey);

    const record = await this.db.query.apiKeys.findFirst({
      where: eq(schema.apiKeys.keyHash, keyHash),
    });

    if (!record || record.status !== 'active') {
      throw new ForbiddenException('Invalid API key');
    }

    req.tenantId = record.tenantId;

    await this.db
      .update(schema.apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(schema.apiKeys.id, record.id))
      .execute();

    return true;
  }
}
