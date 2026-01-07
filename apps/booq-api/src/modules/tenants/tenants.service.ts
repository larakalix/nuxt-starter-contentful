import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../db/drizzle.module';
import { DrizzleDB } from '../../db/types/drizzle';
import { CreateTenantDto, UpdateTenantDto } from './types/tenant.dto';
import { generateSlug } from '../../utils/string.utils';
import { GenericReadOnlyService } from '../../contracts/generic.services';
import { Tenant } from './types/tenant.types';
import * as schema from '../../db/schema/schema';
import { PaginationParams } from '../generic/generic.types';
import { TIME_ZONES } from '../../constants/timeZones.constants';

@Injectable()
export class TenantsService implements GenericReadOnlyService<Tenant> {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async getAll() {
    return this.db.query.tenants.findMany();
  }

  /**
   * @description This method retrieves all users from the database.
   * @memberof TenantsService
   * @returns {Promise<Tenant[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.tenants.findMany({
      where: eq(schema.tenants.id, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of tenants from the database.
   * @memberof TenantsService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<Tenant[]>}
   */
  async findPaged(
    tenantId: string,
    {
      page = 1,
      pageSize = 10,
      sortBy = 'created_at',
      sortOrder = 'desc',
    }: PaginationParams,
    transactionContext?: DrizzleDB,
  ) {
    const _db = transactionContext ?? this.db;

    return await _db.query.tenants.findMany({
      where: eq(schema.tenants.id, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (tenants, { asc, desc }) => {
        return (
          {
            asc: asc(tenants[sortBy]),
            desc: desc(tenants[sortBy]),
          }[sortOrder] || asc(tenants[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a tenant by their ID.
   * @memberof TenantsService
   * @param {string} id - The ID of the tenant to retrieve.
   * @returns {Promise<Tenant | null>}
   */
  async findById(id: string, transactionContext?: DrizzleDB) {
    const _db = transactionContext ?? this.db;

    const [data] = await _db
      .select()
      .from(schema.tenants)
      .where(eq(schema.tenants.id, id));

    if (!data) return null;

    return data;
  }

  /**
   * @description This method retrieves a tenant by their slug.
   * @memberof TenantsService
   * @param {string} slug - The slug of the tenant to retrieve.
   * @param {DrizzleDB} [transactionContext] - Optional transaction context for database operations.
   * @returns {Promise<Tenant | null>}
   */
  async findBySlug(slug: string, transactionContext?: DrizzleDB) {
    const _db = transactionContext ?? this.db;
    const [tenant] = await _db
      .select()
      .from(schema.tenants)
      .where(eq(schema.tenants.slug, slug));

    return tenant || null;
  }

  /**
   * @description This method creates a new tenant in the database.
   * @memberof TenantsService
   * @param {CreateTenantDto} dto - The data transfer object for creating a tenant.
   * @param {DrizzleDB} [transactionContext] - Optional transaction context for database operations.
   * @returns {Promise<Tenant[]>}
   */
  async create(dto: CreateTenantDto, transactionContext?: DrizzleDB) {
    const db = transactionContext ?? this.db;
    const validTimeZone = this.validateTimeZone(dto.timeZone ?? '');

    if (dto.timeZone && !validTimeZone) {
      throw new HttpException(
        `Invalid timezone: ${dto.timeZone}. Validate against the list of supported timezones.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!validTimeZone) {
      throw new HttpException(
        `Invalid timezone: ${dto.timeZone}. Validate against the list of supported timezones.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await db
      .insert(schema.tenants)
      .values({
        ...dto,
        slug: generateSlug(dto.name),
        createdAt: new Date(),
      })
      .returning();
  }

  /**
   * @description This method updates an existing tenant in the database.
   * @memberof TenantsService
   * @param {string} id - The ID of the tenant to update.
   * @param {UpdateTenantDto} dto - The data transfer object for updating a tenant.
   * @param {DrizzleDB} [transactionContext] - Optional transaction context for database operations.
   * @returns {Promise<Tenant[]>}
   */
  async update(
    id: string,
    dto: UpdateTenantDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    return await db
      .update(schema.tenants)
      .set({
        ...dto,
        slug: generateSlug(dto.name),
      })
      .where(eq(schema.tenants.id, id))
      .returning();
  }

  // Private methods
  private validateTimeZone(timezone: string): boolean {
    return TIME_ZONES.includes(timezone);
  }
}
