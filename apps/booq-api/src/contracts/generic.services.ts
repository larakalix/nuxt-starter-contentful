import { DrizzleDB } from 'src/db/types/drizzle';
import { AuthUser } from 'src/modules/auth/types/auth.types';
import { PaginationParams } from 'src/modules/generic/generic.types';

export interface GenericReadOnlyService<T> {
  findAll(tenantId: string): Promise<T[]>;
  findPaged(
    tenantId: string,
    pagination: PaginationParams,
    transactionContext?: DrizzleDB,
  ): Promise<T[]>;
  findById(id: string, transactionContext?: DrizzleDB): Promise<T | null>;
}

export interface GenericWriteService<T> extends GenericReadOnlyService<T> {
  create(
    user: AuthUser,
    dto: Partial<T>,
    transactionContext?: DrizzleDB,
  ): Promise<T>;
  update(
    user: AuthUser,
    id: string,
    dto: Partial<T>,
    transactionContext?: DrizzleDB,
  ): Promise<T | null>;
}

export interface GenericHardDeleteService<T> extends GenericWriteService<T> {
  delete(id: string): Promise<void>;
}

export interface GenericSoftDeleteService<T> extends GenericWriteService<T> {
  softDelete(user: AuthUser, id: string): Promise<boolean>;
}
