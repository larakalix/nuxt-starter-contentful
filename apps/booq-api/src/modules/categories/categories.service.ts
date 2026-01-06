/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/drizzle.module';
import { DrizzleDB } from 'src/db/types/drizzle';
import { GenericSoftDeleteService } from 'src/contracts/generic.services';
import { Category } from './types/categories.types';
import { PaginationParams } from '../generic/generic.types';
import * as schema from 'src/db/schema/schema';
import { SORT_PROPS } from 'src/constants/common.constants';
import { AuthUser } from '../auth/types/auth.types';
import { CreateCategoryDto, UpdateCategoryDto } from './types/categories.dto';

@Injectable()
export class CategoriesService implements GenericSoftDeleteService<Category> {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all categories from the database.
   * @memberof CategoriesService
   * @returns {Promise<Category[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.categories.findMany({
      where: eq(schema.categories.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of categories from the database.
   * @memberof CategoriesService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<Category[]>}
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
    return await _db.query.categories.findMany({
      where: eq(schema.categories.tenantId, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (categories, { asc, desc }) => {
        return (
          {
            asc: asc(categories[sortBy]),
            desc: desc(categories[sortBy]),
          }[sortOrder] || asc(categories[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a category by their ID.
   * @memberof CategoriesService
   * @param {string} id - The ID of the category to retrieve.
   * @returns {Promise<Category | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.id, id));

    if (!data) return null;

    return data;
  }

  /**
   * @description This method creates a new category in the database.
   * @memberof CategoriesService
   * @param {CreateCategoryDto} dto - The data transfer object containing category details.
   * @returns {Promise<Category>}
   */
  async create({ tenantId, userId }: AuthUser, dto: CreateCategoryDto) {
    const [data] = await this.db
      .insert(schema.categories)
      .values({
        ...dto,
        tenantId,
        createdBy: userId,
      })
      .returning();

    return data;
  }

  /**
   * @description This method updates an existing category.
   * @memberof CategoriesService
   * @param {string} id - The ID of the category to update.
   * @param {Partial<UpdateCategoryDto>} dto - The data transfer object containing updated category details.
   * @returns {Promise<Category | null>}
   */
  async update(
    { tenantId, userId }: AuthUser,
    id: string,
    dto: UpdateCategoryDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    const [data] = await db
      .update(schema.categories)
      .set({
        ...dto,
        updatedBy: userId,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(schema.categories.id, id),
          eq(schema.categories.tenantId, tenantId),
        ),
      )
      .returning();

    if (!data) {
      throw new HttpException(
        `Category with ID ${id} not found or not updatable.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  /**
   * @description This method deletes a category by its ID.
   * @memberof CategoriesService
   * @param {string} id - The ID of the category to delete.
   * @returns {Promise<void>}
   */
  async softDelete({ tenantId, userId }: AuthUser, id: string) {
    const [data] = await this.db
      .update(schema.categories)
      .set({
        deletedBy: userId,
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(schema.categories.id, id),
          eq(schema.categories.tenantId, tenantId),
        ),
      )
      .returning();

    if (!data) {
      throw new HttpException(
        `Category with ID ${id} not found or not deletable.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return true;
  }
}
