import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './types/tenant.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@ApiTags('tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly service: TenantsService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Get tenants' })
  async getAll() {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new tenant' })
  async create(@Body() dto: CreateTenantDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an existing tenant' })
  async update(@Body() dto: CreateTenantDto, @Param('id') id: string) {
    return this.service.update(id, dto);
  }
}
