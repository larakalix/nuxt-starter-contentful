import {
  GenericReadOnlyService,
  GenericSoftDeleteService,
  GenericWriteService,
} from '../../../contracts/generic.services';
import { Participant } from './participants.types';
import { AuthUser } from '../../../modules/auth/types/auth.types';
import { CreateParticipantDto } from './participants.dto';
import { DrizzleDB } from '../../../db/types/drizzle';

export interface IParticipantService
  extends
    GenericReadOnlyService<Participant>,
    GenericWriteService<Participant>,
    GenericSoftDeleteService<Participant> {
  createMany(
    user: AuthUser,
    dto: CreateParticipantDto[],
    transactionContext?: DrizzleDB,
  ): Promise<Participant[]>;
}
