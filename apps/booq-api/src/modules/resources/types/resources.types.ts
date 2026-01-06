import * as schema from 'src/db/schema/schema';

export type Resource = typeof schema.resources.$inferSelect;
