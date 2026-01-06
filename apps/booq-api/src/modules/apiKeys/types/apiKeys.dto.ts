import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateApiKeySchema = z.object({
  name: z.string().min(6, 'Name is required'),
});

export class CreateApiKeyDto extends createZodDto(CreateApiKeySchema) {}
export class UpdateApiKeyDto extends createZodDto(CreateApiKeySchema) {}
