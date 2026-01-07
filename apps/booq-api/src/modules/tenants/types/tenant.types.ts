import * as schema from '../../../db/schema/schema';

export type Tenant = typeof schema.tenants.$inferSelect;
