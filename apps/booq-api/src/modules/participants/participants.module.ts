import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [DrizzleModule],
})
export class ParticipantsModule {}
