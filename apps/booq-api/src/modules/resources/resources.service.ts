/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';
import { DRIZZLE } from '../../db/drizzle.module';
import { DrizzleDB } from '../../db/types/drizzle';
import { GenericSoftDeleteService } from '../../contracts/generic.services';
import { Resource } from './types/resources.types';
import { PaginationParams } from '../generic/generic.types';
import { SORT_PROPS } from '../../constants/common.constants';
import * as schema from '../../db/schema/schema';
import { CreateResourceDto, UpdateResourceDto } from './types/resources.dto';
import { AuthUser } from '../auth/types/auth.types';

@Injectable()
export class ResourcesService implements GenericSoftDeleteService<Resource> {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all resources from the database.
   * @memberof ResourcesService
   * @returns {Promise<Resource[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.resources.findMany({
      where: eq(schema.resources.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of resources from the database.
   * @memberof ResourcesService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<Resource[]>}
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
    return await _db.query.resources.findMany({
      where: eq(schema.resources.tenantId, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (resources, { asc, desc }) => {
        return (
          {
            asc: asc(resources[sortBy]),
            desc: desc(resources[sortBy]),
          }[sortOrder] || asc(resources[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a resource by their ID.
   * @memberof ResourcesService
   * @param {string} id - The ID of the resources to retrieve.
   * @returns {Promise<Resource | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.resources)
      .where(eq(schema.resources.id, id));

    if (!data) return null;

    return data;
  }

  /**
   * @description This method creates a new resource.
   * @memberof ResourcesService
   * @param {AuthUser} user - The authenticated user creating the resource.
   * @param {CreateResourceDto} dto - The data transfer object containing resource details.
   * @returns {Promise<Resource>}
   */
  async create(
    { tenantId, userId }: AuthUser,
    dto: CreateResourceDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    const [data] = await db
      .insert(schema.resources)
      .values({
        ...dto,
        tenantId,
        createdBy: userId,
        createdAt: new Date(),
        status: 'available',
      })
      .returning();

    if (!data) {
      throw new HttpException(
        'Failed to create resource',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return data;
  }

  /**
   * @description This method updates an existing participant.
   * @memberof ResourcesService
   * @param {string} id - The ID of the participant to update.
   * @param {Partial<UpdateResourceDto>} dto - The data transfer object containing updated participant details.
   * @returns {Promise<Participant | null>}
   */
  async update(
    { tenantId, userId }: AuthUser,
    id: string,
    dto: UpdateResourceDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    const [data] = await db
      .update(schema.resources)
      .set({
        ...dto,
        updatedBy: userId,
        updatedAt: new Date(),
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
        `Resource with ID ${id} not found or not updatable.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  /**
   * @description This method deletes a resource by its ID.
   * @memberof ResourcesService
   * @param {string} id - The ID of the resource to delete.
   * @returns {Promise<void>}
   */
  async softDelete({ tenantId, userId }: AuthUser, id: string) {
    const [data] = await this.db
      .update(schema.resources)
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

  async loadResourceBuffers(
    resourceIds: string[],
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    if (resourceIds.length === 0) {
      return [];
    }

    return await db.query.resources.findMany({
      columns: {
        id: true,
        bufferAfterMinutes: true,
        bufferBeforeMinutes: true,
      },
      where: inArray(schema.resources.id, resourceIds),
    });
  }
}
