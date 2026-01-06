import * as schema from 'src/db/schema/schema';

export type Tenant = typeof schema.tenants.$inferSelect;
