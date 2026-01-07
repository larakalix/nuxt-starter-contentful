import * as schema from '../../db/schema/schema';

export type Settings = typeof schema.settings.$inferSelect;
