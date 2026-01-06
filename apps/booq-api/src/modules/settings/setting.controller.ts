import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SettingsService } from './setting.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get()
  async getSettings() {
    return this.service.getSettings();
  }
}
