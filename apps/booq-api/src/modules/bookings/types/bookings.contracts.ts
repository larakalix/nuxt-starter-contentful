import { GenericWriteService } from 'src/contracts/generic.services';
import { Booking } from './bookings.types';
import { AuthUser } from 'src/modules/auth/types/auth.types';
import { PaginationParams } from 'src/modules/generic/generic.types';

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
