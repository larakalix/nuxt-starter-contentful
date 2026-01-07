import { Module } from '@nestjs/common';
import { DrizzleModule } from '../../db/drizzle.module';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TenantsService } from '../tenants/tenants.service';
import { ResourcesService } from '../resources/resources.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, TenantsService, ResourcesService],
  imports: [DrizzleModule],
})
export class BookingsModule {}
