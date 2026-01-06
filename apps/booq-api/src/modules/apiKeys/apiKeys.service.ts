/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/drizzle.module';
import { DrizzleDB } from 'src/db/types/drizzle';
import { GenericSoftDeleteService } from 'src/contracts/generic.services';
import { ApiKey } from './types/apiKeys.types';
import { PaginationParams } from '../generic/generic.types';
import { SORT_PROPS } from 'src/constants/common.constants';
import * as schema from 'src/db/schema/schema';
import { CreateApiKeyDto } from './types/apiKeys.dto';
import { AuthUser } from '../auth/types/auth.types';
import { generateApiKey, hashApiKey } from 'src/utils/guard.utils';

@Injectable()
export class ApiKeysService implements Omit<
  GenericSoftDeleteService<ApiKey>,
  'update'
> {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all api keys from the database.
   * @memberof ApiKeysService
   * @returns {Promise<ApiKey[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.apiKeys.findMany({
      where: eq(schema.apiKeys.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of api keys from the database.
   * @memberof ApiKeysService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<ApiKey[]>}
   */
  async findPaged(
    tenantId: string,
    {
      page = 1,
      pageSize = 10,
      sortBy = SORT_PROPS.createdAt,
      sortOrder = 'desc',
    }: PaginationParams,
    transactionContext?: DrizzleDB,
  ) {
    const _db = transactionContext ?? this.db;
    return await _db.query.apiKeys.findMany({
      where: eq(schema.apiKeys.tenantId, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (apiKeys, { asc, desc }) => {
        return (
          {
            asc: asc(apiKeys[sortBy]),
            desc: desc(apiKeys[sortBy]),
          }[sortOrder] || asc(apiKeys[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves an api key by their ID.
   * @memberof ApiKeysService
   * @param {string} id - The ID of the api key to retrieve.
   * @returns {Promise<ApiKey | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.apiKeys)
      .where(eq(schema.apiKeys.id, id));

    if (!data) return null;

    return data;
  }

  /**
   * @description This method creates a new api key.
   * @memberof ApiKeysService
   * @param {AuthUser} user - The authenticated user creating the api key.
   * @param {CreateApiKeyDto} dto - The data transfer object containing api key details.
   * @returns {Promise<ApiKey>}
   */
  async create(
    { tenantId, userId }: AuthUser,
    dto: CreateApiKeyDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;
    const key = generateApiKey('bq_public');

    const [data] = await db
      .insert(schema.apiKeys)
      .values({
        name: dto.name || `API Key ${new Date().toISOString()}`,
        tenantId,
        keyHash: hashApiKey(key),
        status: 'active',
        createdBy: userId,
        createdAt: new Date(),
      })
      .returning();

    if (!data) {
      throw new HttpException(
        'Failed to create api key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      ...data,
      apiKey: key,
    };
  }

  /**
   * @description This method deletes an api key by its ID.
   * @memberof ApiKeysService
   * @param {string} id - The ID of the api key to delete.
   * @returns {Promise<void>}
   */
  async softDelete({ tenantId, userId }: AuthUser, id: string) {
    const [data] = await this.db
      .update(schema.apiKeys)
      .set({
        deletedBy: userId,
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(schema.resources.id, id),
          eq(schema.resources.tenantId, tenantId),
        ),
      )
      .returning();

    if (!data) {
      throw new HttpException(
        `Resource with ID ${id} not found or not deletable.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return true;
  }
}
