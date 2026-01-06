import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './utils/jwt.strategy';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { envConfig } from 'src/config/env.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DrizzleModule } from 'src/db/drizzle.module';
import { TenantsService } from 'src/modules/tenants/tenants.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule,
    DrizzleModule,
    JwtModule.register({
      global: true,
      secret: envConfig.jwtSecret,
      signOptions: { expiresIn: envConfig.jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TenantsService,
    UsersService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
