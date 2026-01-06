import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { User } from '../auth/utils/user.decorator';
import { AuthUser } from '../auth/types/auth.types';
import { CreateCategoryDto, UpdateCategoryDto } from './types/categories.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List all categories in tenant' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  async getAll(@User() { tenantId }: AuthUser) {
    return this.service.findAll(tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created' })
  create(
    @Body(new ZodValidationPipe()) dto: CreateCategoryDto,
    @User() user: AuthUser,
  ) {
    return this.service.create(user, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated' })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe()) dto: UpdateCategoryDto,
    @User() user: AuthUser,
  ) {
    return this.service.update(user, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  delete(@Param('id') id: string, @User() user: AuthUser) {
    return this.service.softDelete(user, id);
  }
}
