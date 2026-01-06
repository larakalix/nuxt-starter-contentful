import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';

@Module({
  controllers: [ResourcesController],
  providers: [ResourcesService],
  imports: [DrizzleModule],
})
export class ResourcesModule {}
