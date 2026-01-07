import { Module } from '@nestjs/common';
import { DrizzleModule } from '../../db/drizzle.module';
import { ApiKeysService } from './apiKeys.service';
import { ApiKeysController } from './apiKeys.controller';

@Module({
  controllers: [ApiKeysController],
  providers: [ApiKeysService],
  imports: [DrizzleModule],
})
export class ApiKeysModule {}
