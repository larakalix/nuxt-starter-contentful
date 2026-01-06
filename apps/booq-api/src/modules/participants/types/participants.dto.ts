import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const ParticipantBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
});

// export const CreateParticipantSchema = z
//   .object({})
//   .merge(ParticipantBaseSchema);

// export const UpdateParticipantSchema = z
//   .object({})
//   .merge(ParticipantBaseSchema);

export class CreateParticipantDto extends createZodDto(ParticipantBaseSchema) {}
export class UpdateParticipantDto extends createZodDto(ParticipantBaseSchema) {}
