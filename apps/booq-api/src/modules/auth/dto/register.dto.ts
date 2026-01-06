import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

const CommonRegisterSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const RegisterInTenantSchema = z
  .object({
    tenantId: z.string().min(2),
  })
  .merge(CommonRegisterSchema);

const RegisterSchema = z
  .object({
    tenant: z.object({
      name: z.string().min(2),
      country: z.string().min(2).default('US'),
      language: z.string().min(2).default('en'),
    }),
  })
  .merge(CommonRegisterSchema);

export class RegisterDto extends createZodDto(RegisterSchema) {}

export class RegisterInTenantDto extends createZodDto(RegisterInTenantSchema) {}
