import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateBookingSchema = z.object({
  startAt: z.coerce
    .date()
    .min(new Date(), { message: 'startAt must be in the future' }),
  endAt: z.coerce.date().nullable(),
  resourceIds: z
    .array(z.string())
    .min(1, { message: 'At least one resourceId is required' }),
  participantIds: z
    .array(z.string())
    .min(1, { message: 'At least one resourceId is required' }),
  note: z.string().optional(),
});

export class CreateBookingDto extends createZodDto(CreateBookingSchema) {}

export class UpdateBookingDto extends createZodDto(CreateBookingSchema) {}
