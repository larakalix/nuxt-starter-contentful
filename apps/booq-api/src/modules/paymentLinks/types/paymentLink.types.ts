import * as schema from '../../../db/schema/schema';

export type PaymentLink = typeof schema.payment_links.$inferSelect;
