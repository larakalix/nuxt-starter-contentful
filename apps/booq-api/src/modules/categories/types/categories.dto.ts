import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
});

// export const UpdateCategorySchema = CreateCategorySchema.extend({});

export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}

export class UpdateCategoryDto extends createZodDto(CreateCategorySchema) {}
