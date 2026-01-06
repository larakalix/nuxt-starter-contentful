import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [DrizzleModule],
})
export class BookingsModule {}
