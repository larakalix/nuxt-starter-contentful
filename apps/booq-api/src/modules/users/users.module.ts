import { Module } from '@nestjs/common';
import { DrizzleModule } from '../../db/drizzle.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DrizzleModule],
})
export class UsersModule {}
