import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto, RegisterInTenantDto } from './dto/register.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and receive a JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login' })
  async login(@Body(new ZodValidationPipe()) { email, password }: LoginDto) {
    const token = await this.service.login(email, password);
    if (!token)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return token;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user and tenant' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 200, description: 'Register' })
  async register(@Body(new ZodValidationPipe()) dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Post(':tenantId/register')
  @ApiOperation({ summary: 'Register a new user in a specific tenant' })
  @ApiBody({ type: RegisterInTenantDto })
  @ApiResponse({ status: 200, description: 'Register in tenant' })
  async registerInTenant(
    @Body(new ZodValidationPipe()) dto: RegisterInTenantDto,
    @Param('tenantId') tenantId: string,
  ) {
    return this.service.registerInTenant({ ...dto, tenantId });
  }
}
