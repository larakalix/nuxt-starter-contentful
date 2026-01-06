import * as schema from 'src/db/schema/schema';

export type User = typeof schema.users.$inferSelect;
