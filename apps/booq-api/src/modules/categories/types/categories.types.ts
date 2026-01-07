import * as schema from '../../../db/schema/schema';

export type Category = typeof schema.categories.$inferSelect;
