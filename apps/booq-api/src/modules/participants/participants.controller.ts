import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ParticipantsService } from './participants.service';
import { User } from '../../modules/auth/utils/user.decorator';
import { AuthUser } from '../../modules/auth/types/auth.types';
import {
  CreateParticipantDto,
  UpdateParticipantDto,
} from './types/participants.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('participants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly service: ParticipantsService) {}

  @Get()
  @ApiOperation({ summary: 'List participants' })
  @ApiResponse({ status: 200, description: 'Paginated list of locations' })
  getAll(@User() { tenantId }: AuthUser) {
    return this.service.findAll(tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new participant' })
  @ApiBody({ type: CreateParticipantDto })
  @ApiResponse({ status: 201, description: 'Participant created' })
  create(
    @Body(new ZodValidationPipe()) dto: CreateParticipantDto,
    @User() user: AuthUser,
  ) {
    return this.service.create(user, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing participant' })
  @ApiBody({ type: UpdateParticipantDto })
  @ApiResponse({ status: 200, description: 'Participant updated' })
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe()) dto: UpdateParticipantDto,
    @User() user: AuthUser,
  ) {
    return this.service.update(user, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a participant' })
  @ApiResponse({ status: 200, description: 'Participant deleted' })
  delete(@Param('id') id: string, @User() user: AuthUser) {
    return this.service.softDelete(user, id);
  }
}
