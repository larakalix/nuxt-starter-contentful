import { InferInsertModel } from 'drizzle-orm';
import * as schema from '../../../db/schema/schema';

export type Booking = typeof schema.bookings.$inferSelect;

export type AvailabilityBlock = InferInsertModel<
  typeof schema.availabilityBlocks
>;
