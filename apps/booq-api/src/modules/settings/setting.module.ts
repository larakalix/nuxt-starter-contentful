import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { SettingsService } from './setting.service';
import { SettingsController } from './setting.controller';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [DrizzleModule],
})
export class SettingsModule {}
