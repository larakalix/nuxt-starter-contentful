import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './types/bookings.dto';
import { User } from '../../modules/auth/utils/user.decorator';
import { AuthUser } from '../../modules/auth/types/auth.types';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'List bookings (paginated)' })
  @ApiResponse({ status: 200, description: 'Paginated list of bookings' })
  getAll(@User() { tenantId }: AuthUser) {
    return this.service.findAll(tenantId);
  }

  @Get('/paged')
  @ApiOperation({ summary: 'List bookings with pagination' })
  @ApiResponse({ status: 200, description: 'Paginated list of bookings' })
  getPaged(
    @User() user: AuthUser,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
  ) {
    return this.service.findPaged(user, { page, pageSize, sortBy });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({ status: 201, description: 'Booking created' })
  create(@Body() dto: CreateBookingDto, @User() user: AuthUser) {
    return this.service.create(user, dto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a booking (soft delete)' })
  @ApiResponse({ status: 200, description: 'Booking canceled' })
  cancelBooking(@Param('id') id: string, @User() user: AuthUser) {
    return this.service.cancel(user, id);
  }
}
