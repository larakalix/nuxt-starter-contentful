import * as schema from '../../../db/schema/schema';

export type Resource = typeof schema.resources.$inferSelect;
