import { Injectable } from '@nestjs/common';
import { envConfig } from './config/env.config';

@Injectable()
export class AppService {
  getApiInfo(): {
    title: string;
    description: string;
    version: string;
  } {
    return {
      title: 'NestJS Appointments API',
      description: 'API for managing appointments in a healthcare system',
      version: envConfig.version,
    };
  }
}
