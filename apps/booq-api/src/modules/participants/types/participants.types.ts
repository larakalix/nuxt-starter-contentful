import * as schema from '../../../db/schema/schema';

export type Participant = typeof schema.participants.$inferSelect;
