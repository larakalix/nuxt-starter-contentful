/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../db/drizzle.module';
import { DrizzleDB } from '../../db/types/drizzle';
import { GenericReadOnlyService } from '../../contracts/generic.services';
import { PaymentLink } from './types/paymentLink.types';
import { PaginationParams } from '../generic/generic.types';
import * as schema from '../../db/schema/schema';

@Injectable()
export class PaymentLinksService implements GenericReadOnlyService<PaymentLink> {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all payment links from the database.
   * @memberof PaymentLinksService
   * @returns {Promise<PaymentLink[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.payment_links.findMany({
      where: eq(schema.payment_links.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of payment links from the database.
   * @memberof PaymentLinksService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<PaymentLink[]>}
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
    return await _db.query.payment_links.findMany({
      where: eq(schema.payment_links.tenantId, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (payment_links, { asc, desc }) => {
        return (
          {
            asc: asc(payment_links[sortBy]),
            desc: desc(payment_links[sortBy]),
          }[sortOrder] || asc(payment_links[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a payment link by their ID.
   * @memberof PaymentLinksService
   * @param {string} id - The ID of the payment link to retrieve.
   * @returns {Promise<PaymentLink | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.payment_links)
      .where(eq(schema.payment_links.id, id));

    if (!data) return null;

    return data;
  }
}
