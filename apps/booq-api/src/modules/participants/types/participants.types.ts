import * as schema from 'src/db/schema/schema';

export type Participant = typeof schema.participants.$inferSelect;
