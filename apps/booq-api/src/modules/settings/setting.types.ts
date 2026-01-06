import * as schema from 'src/db/schema/schema';

export type Settings = typeof schema.settings.$inferSelect;
