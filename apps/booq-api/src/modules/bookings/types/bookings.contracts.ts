import { GenericWriteService } from '../../../contracts/generic.services';
import { Booking } from './bookings.types';
import { AuthUser } from '../../../modules/auth/types/auth.types';
import { PaginationParams } from '../../../modules/generic/generic.types';

export interface IBookingService extends Omit<
  GenericWriteService<Booking>,
  'update' | 'findPaged'
> {
  cancel(user: AuthUser, id: string): Promise<boolean>;
  findPaged(
    user: AuthUser,
    pagination: PaginationParams,
    transactionContext?: any,
  ): Promise<Booking[]>;
}
