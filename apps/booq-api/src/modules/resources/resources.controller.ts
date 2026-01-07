import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { User } from '../auth/utils/user.decorator';
import { AuthUser } from '../auth/types/auth.types';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateResourceDto, UpdateResourceDto } from './types/resources.dto';
import { ApiKeyGuard } from '../../guards/api-key.guard';

@ApiTags('resources')
@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly service: ResourcesService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'List all resources in tenant' })
  @ApiResponse({ status: 200, description: 'List of resources' })
  async getAll(@Req() { tenantId }: Request) {
    return this.service.findAll(tenantId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiBody({ type: CreateResourceDto })
  @ApiResponse({ status: 201, description: 'Resource created' })
  create(
    @Body(new ZodValidationPipe()) dto: CreateResourceDto,
    @User() user: AuthUser,
  ) {
    return this.service.create(user, dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiBody({ type: UpdateResourceDto })
  @ApiResponse({ status: 200, description: 'Category updated' })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe()) dto: UpdateResourceDto,
    @User() user: AuthUser,
  ) {
    return this.service.update(user, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  delete(@Param('id') id: string, @User() user: AuthUser) {
    return this.service.softDelete(user, id);
  }
}
