import * as schema from 'src/db/schema/schema';

export type PaymentLink = typeof schema.payment_links.$inferSelect;
