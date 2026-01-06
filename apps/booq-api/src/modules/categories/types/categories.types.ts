import * as schema from 'src/db/schema/schema';

export type Category = typeof schema.categories.$inferSelect;
