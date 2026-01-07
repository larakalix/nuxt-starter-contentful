import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeysService } from './apiKeys.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { User } from '../auth/utils/user.decorator';
import { AuthUser } from '../auth/types/auth.types';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateApiKeyDto } from './types/apiKeys.dto';
import { ApiKeyGuard } from '../../guards/api-key.guard';

@ApiTags('api-keys')
@ApiBearerAuth()
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly service: ApiKeysService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'List all api keys in tenant' })
  @ApiResponse({ status: 200, description: 'List of api keys' })
  async getAll(@Req() { tenantId }: Request) {
    return this.service.findAll(tenantId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new api key' })
  @ApiBody({ type: CreateApiKeyDto })
  @ApiResponse({ status: 201, description: 'Api key created' })
  create(
    @Body(new ZodValidationPipe()) dto: CreateApiKeyDto,
    @User() user: AuthUser,
  ) {
    return this.service.create(user, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete an api key' })
  @ApiResponse({ status: 200, description: 'Api key deleted' })
  delete(@Param('id') id: string, @User() user: AuthUser) {
    return this.service.softDelete(user, id);
  }
}
