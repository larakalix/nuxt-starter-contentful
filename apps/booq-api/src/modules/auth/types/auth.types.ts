export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface AuthPayload {
  sub: string; // user id
  email: string;
  tenantId: string;
  role: string;
}

export interface AuthUser {
  userId: string;
  email: string;
  tenantId: string;
  role: string;
}
