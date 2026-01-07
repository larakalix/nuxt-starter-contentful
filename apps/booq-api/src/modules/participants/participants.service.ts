/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE } from '../../db/drizzle.module';
import { DrizzleDB } from '../../db/types/drizzle';
import { PaginationParams } from '../generic/generic.types';
import { IParticipantService } from './types/participants.contracts';
import { AuthUser } from '../auth/types/auth.types';
import {
  CreateParticipantDto,
  UpdateParticipantDto,
} from './types/participants.dto';
import * as schema from '../../db/schema/schema';
import { SORT_PROPS } from '../../constants/common.constants';

@Injectable()
export class ParticipantsService implements IParticipantService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  /**
   * @description This method retrieves all participants for a given tenant.
   * @memberof ParticipantsService
   * @returns {Promise<Participant[]>}
   */
  async findAll(tenantId: string) {
    return this.db.query.participants.findMany({
      where: eq(schema.participants.tenantId, tenantId),
    });
  }

  /**
   * @description This method retrieves a paginated list of participants for a given tenant.
   * @memberof ParticipantsService
   * @param {PaginationParams} pagination - The pagination parameters.
   * @returns {Promise<Participant[]>}
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
    return await _db.query.participants.findMany({
      where: eq(schema.participants.tenantId, tenantId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (participants, { asc, desc }) => {
        return (
          {
            asc: asc(participants[sortBy]),
            desc: desc(participants[sortBy]),
          }[sortOrder] || asc(participants[sortBy])
        );
      },
    });
  }

  /**
   * @description This method retrieves a participant by its ID.
   * @memberof ParticipantsService
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<Participant | null>}
   */
  async findById(id: string) {
    const [data] = await this.db
      .select()
      .from(schema.participants)
      .where(eq(schema.participants.id, id));

    if (!data) {
      throw new HttpException(
        `Participant with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return data;
  }

  /**
   * @description This method creates a new participant.
   * @memberof ParticipantsService
   * @param {AuthUser} user - The authenticated user creating the participant.
   * @param {CreateParticipantDto} dto - The data transfer object containing participant details.
   * @returns {Promise<Participant>}
   */
  async create(
    { tenantId, userId }: AuthUser,
    dto: CreateParticipantDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    const [data] = await db
      .insert(schema.participants)
      .values({
        ...dto,
        tenantId,
        createdBy: userId,
        createdAt: new Date(),
      })
      .returning();

    if (!data) {
      throw new HttpException(
        'Failed to create participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return data;
  }

  /**
   * @description This method creates multiple participants.
   * @memberof ParticipantsService
   * @param {AuthUser} user - The authenticated user creating the participants.
   * @param {CreateParticipantDto[]} dtos - The data transfer objects containing participant details.
   * @returns {Promise<Participant[]>}
   */
  async createMany(
    { tenantId, userId }: AuthUser,
    dtos: CreateParticipantDto[],
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    const participants = dtos.map((dto) => ({
      ...dto,
      tenantId,
      createdBy: userId,
      createdAt: new Date(),
    }));

    const data = await db
      .insert(schema.participants)
      .values(participants)
      .returning();

    if (!data) {
      throw new HttpException(
        'Failed to create participants',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return data;
  }

  /**
   * @description This method updates an existing participant.
   * @memberof ParticipantsService
   * @param {string} id - The ID of the participant to update.
   * @param {Partial<UpdateParticipantDto>} dto - The data transfer object containing updated participant details.
   * @returns {Promise<Participant | null>}
   */
  async update(
    { tenantId, userId }: AuthUser,
    id: string,
    dto: UpdateParticipantDto,
    transactionContext?: DrizzleDB,
  ) {
    const db = transactionContext ?? this.db;

    const [data] = await db
      .update(schema.participants)
      .set({
        ...dto,
        updatedBy: userId,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(schema.participants.id, id),
          eq(schema.participants.tenantId, tenantId),
        ),
      )
      .returning();

    if (!data) {
      throw new HttpException(
        `Participant with ID ${id} not found or not updatable.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  /**
   * @description This method deletes a participant by its ID.
   * @memberof ParticipantsService
   * @param {string} id - The ID of the participant to delete.
   * @returns {Promise<void>}
   */
  async softDelete({ tenantId, userId }: AuthUser, id: string) {
    const [data] = await this.db
      .update(schema.participants)
      .set({
        deletedBy: userId,
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(schema.participants.id, id),
          eq(schema.participants.tenantId, tenantId),
        ),
      )
      .returning();

    if (!data) {
      throw new HttpException(
        `Participant with ID ${id} not found or not deletable.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return true;
  }
}
