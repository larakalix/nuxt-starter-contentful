import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { User } from '../auth/utils/user.decorator';
import { AuthUser } from '../auth/types/auth.types';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users in tenant' })
  @ApiResponse({ status: 200, description: 'List of users' })
  async getAll(@User() { tenantId }: AuthUser) {
    return this.service.findAll(tenantId);
  }
}
