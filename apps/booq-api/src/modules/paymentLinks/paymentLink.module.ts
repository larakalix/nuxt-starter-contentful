import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { PaymentLinksService } from './paymentLink.service';
import { PaymentLinksController } from './paymentLink.controller';

@Module({
  controllers: [PaymentLinksController],
  providers: [PaymentLinksService],
  imports: [DrizzleModule],
})
export class PaymentLinksModule {}
