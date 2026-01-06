import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateTenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  country: z.string().min(1, 'Country is required'),
  domain: z.string().min(1, 'Domain is required'),
  email: z.string().email('Invalid email address'),
  timeZone: z.string().optional(),
});

export class CreateTenantDto extends createZodDto(CreateTenantSchema) {}

export class UpdateTenantDto extends createZodDto(CreateTenantSchema) {}
