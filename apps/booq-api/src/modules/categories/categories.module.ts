import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [DrizzleModule],
})
export class CategoriesModule {}
