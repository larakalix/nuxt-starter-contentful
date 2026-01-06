import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/drizzle.module';
import { DrizzleDB } from 'src/db/types/drizzle';
import { CreateBookingDto } from './types/bookings.dto';
import { AuthUser } from 'src/modules/auth/types/auth.types';
import { PaginationParams } from '../generic/generic.types';
import { IBookingService } from './types/bookings.contracts';
import * as schema from 'src/db/schema/schema';
import { SORT_PROPS } from 'src/constants/common.constants';
import { AvailabilityBlock } from './types/bookings.types';

@Injectable()
export class BookingsService implements IBookingService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all bookings for a given tenant.
   * @memberof BookingsService
   * @returns {Promise<Booking[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.bookings.findMany({
      where: eq(schema.bookings.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of bookings for a given tenant.
   * @memberof BookingsService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<Booking[]>}
   */
  async findPaged(
    user: AuthUser,
    {
      page = 1,
      pageSize = 10,
      sortBy = SORT_PROPS.createdAt,
      sortOrder = 'desc',
    }: PaginationParams,
    transactionContext?: DrizzleDB,
  ) {
    const _db = transactionContext ?? this.db;

    return await _db.query.bookings.findMany({
      where: and(
        eq(schema.bookings.tenantId, user.tenantId),
        eq(schema.bookings.createdBy, user.userId),
      ),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (bookings, { asc, desc }) => {
        return (
          {
            asc: asc(bookings[sortBy]),
            desc: desc(bookings[sortBy]),
          }[sortOrder] || asc(bookings[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a booking by its ID.
   * @memberof BookingsService
   * @param {string} id - The ID of the booking to retrieve.
   * @returns {Promise<Booking | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.bookings)
      .where(eq(schema.bookings.id, id));

    if (!data) return null;

    return data;
  }

  /**
   * @description This method creates a new booking in the database.
   * @memberof BookingsService
   * @param {CreateBookingDto} dto - The data transfer object containing booking details.
   * @returns {Promise<Booking>}
   */
  async create({ tenantId, userId }: AuthUser, dto: CreateBookingDto) {
    return await this.db.transaction(async (tx) => {
      const tenant = await tx.query.tenants.findFirst({
        where: eq(schema.tenants.id, tenantId),
      });

      // 1️⃣ Create booking
      const [booking] = await tx
        .insert(schema.bookings)
        .values({
          ...dto,
          status: 'scheduled',
          startAt: new Date(dto.startAt),
          endAt: dto.endAt ? new Date(dto.endAt) : null,
          tenantId,
          createdBy: userId,
        })
        .returning();

      // 2️⃣ Prepare availability blocks
      const blocks: AvailabilityBlock[] = [];

      for (const resourceId of dto.resourceIds ?? []) {
        blocks.push({
          tenantId,
          bookingId: booking.id,
          kind: 'resource',
          targetId: resourceId,
          startAt: booking.startAt,
          endAt: booking.endAt,
          type: tenant?.type || 'other',
          status: 'active',
        });
      }

      for (const participantId of dto.participantIds ?? []) {
        blocks.push({
          tenantId,
          bookingId: booking.id,
          kind: 'participant',
          targetId: participantId,
          startAt: booking.startAt,
          endAt: booking.endAt,
          type: tenant?.type || 'other',
          status: 'active',
        });
      }

      // 3️⃣ Insert availability blocks (THIS CAN FAIL) if there are conflicts with existing blocks
      if (blocks.length > 0) {
        await tx.insert(schema.availabilityBlocks).values(blocks);
      }

      // 4️⃣ Store relationships (non-blocking)
      if (dto.resourceIds?.length) {
        await tx.insert(schema.bookingResources).values(
          dto.resourceIds.map((id) => ({
            bookingId: booking.id,
            resourceId: id,
          })),
        );
      }

      if (dto.participantIds?.length) {
        await tx.insert(schema.bookingParticipants).values(
          dto.participantIds.map((id) => ({
            bookingId: booking.id,
            participantId: id,
          })),
        );
      }

      return booking;
    });
  }

  /**
   * @description This method cancels a booking by its ID.
   * @memberof BookingsService
   * @param {string} id - The ID of the booking to cancel.
   * @returns {Promise<boolean>}
   */
  async cancel({ tenantId, userId }: AuthUser, id: string) {
    const [data] = await this.db
      .update(schema.bookings)
      .set({
        deletedBy: userId,
        deletedAt: new Date(),
      })
      .where(
        and(eq(schema.bookings.id, id), eq(schema.bookings.tenantId, tenantId)),
      )
      .returning();

    if (!data) {
      throw new Error(
        `Appointment with ID ${id} not found or not cancellable.`,
      );
    }

    return !!data;
  }
}
