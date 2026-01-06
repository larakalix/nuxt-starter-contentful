import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentLinksService } from './paymentLink.service';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { User } from '../auth/utils/user.decorator';
import { AuthUser } from '../auth/types/auth.types';

@ApiTags('payment-links')
@ApiBearerAuth()
@Controller('payment-links')
@UseGuards(JwtAuthGuard)
export class PaymentLinksController {
  constructor(private readonly service: PaymentLinksService) {}

  @Get()
  @ApiOperation({ summary: 'List all payment links in tenant' })
  @ApiResponse({ status: 200, description: 'List of payment links' })
  async getAll(@User() { tenantId }: AuthUser) {
    return this.service.findAll(tenantId);
  }
}
