import * as schema from '../../../db/schema/schema';

export type User = typeof schema.users.$inferSelect;
