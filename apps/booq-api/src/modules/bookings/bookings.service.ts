import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { Cron } from '@nestjs/schedule';
import { DRIZZLE } from 'src/db/drizzle.module';
import { DrizzleDB } from 'src/db/types/drizzle';
import { CreateBookingDto } from './types/bookings.dto';
import { AuthUser } from 'src/modules/auth/types/auth.types';
import { PaginationParams } from '../generic/generic.types';
import { IBookingService } from './types/bookings.contracts';
import { SORT_PROPS } from 'src/constants/common.constants';
import { AvailabilityBlock } from './types/bookings.types';
import { TenantsService } from '../tenants/tenants.service';
import * as schema from 'src/db/schema/schema';
import { applyBuffer } from 'src/utils/date.utils';
import { ResourcesService } from '../resources/resources.service';

@Injectable()
export class BookingsService implements IBookingService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly tenantService: TenantsService,
    private readonly resourcesService: ResourcesService,
  ) {}

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
      const tenant = await this.tenantService.findById(tenantId, tx);

      // Create booking
      const [booking] = await tx
        .insert(schema.bookings)
        .values({
          ...dto,
          status: 'scheduled',
          startAt: new Date(dto.startAt),
          endAt: dto.endAt ? new Date(dto.endAt) : null,
          type: tenant?.type || 'other',
          tenantId,
          createdBy: userId,
        })
        .returning();

      // Load resources (to get buffers)
      const resources = await this.resourcesService.loadResourceBuffers(
        dto.resourceIds || [],
        tx,
      );

      // Build availability blocks (buffers applied)
      const blocks: AvailabilityBlock[] = [];
      resources.forEach((resource) => {
        const { startAt, endAt } = applyBuffer(
          booking.startAt,
          booking.endAt,
          resource.bufferBeforeMinutes ?? 0,
          resource.bufferAfterMinutes ?? 0,
        );

        blocks.push({
          tenantId,
          bookingId: booking.id,
          kind: 'resource' as const,
          targetId: resource.id,
          startAt,
          endAt,
          status: 'active',
        });
      });

      (dto.participantIds ?? []).forEach((blockId) => {
        blocks.push({
          tenantId,
          bookingId: booking.id,
          kind: 'participant',
          targetId: blockId,
          startAt: booking.startAt,
          endAt: booking.endAt,
          status: 'active',
        });
      });

      // Insert availability blocks (THIS CAN FAIL) if there are conflicts with existing blocks
      if (blocks.length > 0) {
        await tx.insert(schema.availabilityBlocks).values(blocks);
      }

      // Store relationships (non-blocking)
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

  // @Cron('*/5 * * * * *')
  @Cron('0 0 * * *')
  revalidateAvailabilityBlocks() {
    const now = new Date();

    console.log('Revalidating availability blocks...', now);

    // await this.db
    //   .update(schema.availabilityBlocks)
    //   .set({ status: 'released' })
    //   .where(
    //     and(
    //       eq(schema.availabilityBlocks.status, 'active'),
    //       sql`${schema.availabilityBlocks.endAt} < ${now}`,
    //     ),
    //   );
  }
}
