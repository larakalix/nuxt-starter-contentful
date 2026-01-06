/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/drizzle.module';
import { DrizzleDB } from 'src/db/types/drizzle';
import { GenericReadOnlyService } from 'src/contracts/generic.services';
import { User } from './types/user.types';
import { PaginationParams } from '../generic/generic.types';
import * as schema from 'src/db/schema/schema';

@Injectable()
export class UsersService implements GenericReadOnlyService<User> {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all users from the database.
   * @memberof UsersService
   * @returns {Promise<User[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.users.findMany({
      where: eq(schema.users.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of users from the database.
   * @memberof UsersService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<User[]>}
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
    return await _db.query.users.findMany({
      where: eq(schema.users.tenantId, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (users, { asc, desc }) => {
        return (
          {
            asc: asc(users[sortBy]),
            desc: desc(users[sortBy]),
          }[sortOrder] || asc(users[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a user by their ID.
   * @memberof UsersService
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));

    if (!data) return null;

    return data;
  }

  /**
   * @description This method retrieves a user by their email.
   * @memberof UsersService
   * @param {string} email - The email of the user to retrieve.
   * @param {DrizzleDB} [transactionContext] - Optional transaction context.
   * @returns {Promise<User[]>}
   */
  async findByEmail(email: string, transactionContext?: DrizzleDB) {
    const _db = transactionContext ?? this.db;
    return await _db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
  }
}
