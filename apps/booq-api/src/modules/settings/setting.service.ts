import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/db/drizzle.module';
import { DrizzleDB } from 'src/db/types/drizzle';

@Injectable()
export class SettingsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async getSettings() {
    const settings = await this.db.query.settings.findMany();

    return settings;
  }
}
