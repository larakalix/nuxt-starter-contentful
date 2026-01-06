import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateResourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be at least 0'),
  type: z.enum(['service', 'product', 'room', 'equipment']),
  attributes: z
    .array(
      z.object({
        key: z.string().min(1, 'Attribute key is required'),
        label: z.string().min(1, 'Attribute label is required'),
        description: z.string().optional(),
      }),
    )
    .optional(),
});

export class CreateResourceDto extends createZodDto(CreateResourceSchema) {}

export class UpdateResourceDto extends createZodDto(CreateResourceSchema) {}
