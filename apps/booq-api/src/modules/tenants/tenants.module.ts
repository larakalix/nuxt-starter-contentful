import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [DrizzleModule],
})
export class TenantsModule {}
