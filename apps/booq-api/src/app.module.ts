import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { envConfig } from './config/env.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Database
import { DrizzleModule } from './db/drizzle.module';

// Controllers
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { SettingsModule } from './modules/settings/setting.module';
import { PaymentLinksModule } from './modules/paymentLinks/paymentLink.module';
import { ParticipantsModule } from './modules/participants/participants.module';
import { ApiKeysModule } from './modules/apiKeys/apiKeys.module';

const isProduction = process.env.ENV === 'production';
const ENV_FILE_PATH = isProduction ? '.env' : '.env.local';

const FEATURE_MODULES = [
  BookingsModule,
  CategoriesModule,
  ParticipantsModule,
  ResourcesModule,
  SettingsModule,
  TenantsModule,
  PaymentLinksModule,
  ApiKeysModule,
  UsersModule,
];

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'warn',
        autoLogging: false,
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
        customProps: (req) => ({
          requestId: req.id,
          method: req.method,
          path: req.url,
        }),
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    DrizzleModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [() => ({ envConfig })],
    }),
    DevtoolsModule.register({
      http: !isProduction,
      port: 8900,
    }),
    ...FEATURE_MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
