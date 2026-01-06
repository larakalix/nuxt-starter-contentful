import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  integer,
  numeric,
  varchar,
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core';

const keys = {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenantId')
    .notNull()
    .references(() => tenants.id),
} as const;

const timestamps = {
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').default(sql`NULL`),
  deletedAt: timestamp('deletedAt').default(sql`NULL`),
} as const;

const auditFields = {
  deletedBy: uuid('deletedBy').references(() => users.id),
  updatedBy: uuid('updatedBy').references(() => users.id),
  createdBy: uuid('createdBy')
    .references(() => users.id)
    .notNull(),
};

export const languageStatusEnum = pgEnum('language_status', [
  'active',
  'inactive',
]);

export const languages = pgTable('languages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  nativeName: text('nativeName'),
  code: text('code').notNull(),
  isDefault: text('isDefault').default('false'),
  status: languageStatusEnum().default('active'),
  ...timestamps,
});

export const tenantStatusEnum = pgEnum('tenant_status', [
  'active',
  'inactive',
  'suspended',
  'on_board',
  'on_trial',
]);

export const tenantTypeEnum = pgEnum('tenant_type', [
  'car_rental',
  'hotel',
  'doctor',
  'salon',
  'fitness',
  'education',
  'other',
]);

export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  logoUrl: text('logoUrl'),
  currency: text('currency').default('USD'),
  country: text('country').default('US'),
  type: tenantTypeEnum().default('other'),
  timeZone: text('timeZone').default('America/New_York'),
  status: tenantStatusEnum().default('on_trial'),
  ...timestamps,
});

export const users = pgTable('users', {
  ...keys,
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('admin'),
  passwordHash: text('passwordHash'),
  ...timestamps,
});

export const categories = pgTable('categories', {
  ...keys,
  name: text('name').notNull(),
  description: text('description'),
  ...timestamps,
  ...auditFields,
});

export const resourceTypeEnum = pgEnum('resource_type', [
  'service',
  'product',
  'room',
  'equipment',
]);

export const resourceStatusEnum = pgEnum('resource_status', [
  'available',
  'unavailable',
  'maintenance',
]);

export const resources = pgTable('resources', {
  ...keys,
  name: text('name').notNull(),
  type: resourceTypeEnum().notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  attributes: jsonb('attributes').$type<
    {
      key: string;
      label: string;
      description?: string;
    }[]
  >(),
  status: resourceStatusEnum().default('available'),
  email: text('email'),
  phone: text('phone'),
  ...timestamps,
  ...auditFields,
});

export const resourceCategories = pgTable(
  'resource_categories',
  {
    resourceId: uuid('resourceId')
      .notNull()
      .references(() => resources.id),

    categoryId: uuid('categoryId')
      .notNull()
      .references(() => categories.id),
  },
  (t) => [
    primaryKey({
      columns: [t.resourceId, t.categoryId],
    }),
  ],
);

export const participants = pgTable('participants', {
  ...keys,
  name: text('name').notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  email: text('email'),
  phone: text('phone'),
  ...timestamps,
  ...auditFields,
});

export const participantCategories = pgTable(
  'participant_categories',
  {
    participantId: uuid('participantId')
      .notNull()
      .references(() => participants.id),
    categoryId: uuid('categoryId')
      .notNull()
      .references(() => categories.id),
  },
  (t) => [
    primaryKey({
      columns: [t.participantId, t.categoryId],
    }),
  ],
);

export const discounts = pgTable('discounts', {
  ...keys,
  name: text('name').notNull(),
  percentage: integer('percentage'),
  cents: integer('cents'),
  type: varchar('type', { length: 50 }).notNull(),
  ...timestamps,
  ...auditFields,
});

export const appointmentStatusEnum = pgEnum('appointment_status', [
  'scheduled',
  'completed',
  'canceled',
  'no_show',
  'rescheduled',
  'pending',
  'confirmed',
  'awaiting_payment',
]);

export const bookings = pgTable('bookings', {
  ...keys,
  startAt: timestamp('startAt', { withTimezone: true }).notNull(),
  endAt: timestamp('endAt', { withTimezone: true }),
  note: text('note'),
  status: appointmentStatusEnum().default('scheduled'),
  ...timestamps,
  ...auditFields,
});

export const bookingResources = pgTable(
  'booking_resources',
  {
    bookingId: uuid('bookingId')
      .notNull()
      .references(() => bookings.id, { onDelete: 'cascade' }),
    resourceId: uuid('resourceId')
      .notNull()
      .references(() => resources.id),
  },
  (t) => [primaryKey({ columns: [t.bookingId, t.resourceId] })],
);

export const bookingParticipants = pgTable(
  'booking_participants',
  {
    bookingId: uuid('bookingId')
      .notNull()
      .references(() => bookings.id, { onDelete: 'cascade' }),
    participantId: uuid('participantId')
      .notNull()
      .references(() => participants.id),
  },
  (t) => [primaryKey({ columns: [t.bookingId, t.participantId] })],
);

export const availabilityKindEnum = pgEnum('availability_kind', [
  'resource',
  'participant',
]);

export const availabilityStatusEnum = pgEnum('availability_status', [
  'active',
  'released',
  'canceled',
]);

export const availabilityBlocks = pgTable('availability_blocks', {
  ...keys,
  bookingId: uuid('bookingId')
    .notNull()
    .references(() => bookings.id, { onDelete: 'cascade' }),

  kind: availabilityKindEnum().notNull(),
  // resourceId OR participantId
  targetId: uuid('targetId').notNull(),
  startAt: timestamp('startAt', { withTimezone: true }).notNull(),
  endAt: timestamp('endAt', { withTimezone: true }),
  status: availabilityStatusEnum().default('active'),
  type: tenantTypeEnum().default('other'),
  ...timestamps,
});

export const workingHours = pgTable('working_hours', {
  ...keys,
  kind: availabilityKindEnum().notNull(),
  targetId: uuid('targetId').notNull(),
  dayOfWeek: integer('dayOfWeek').notNull(), // 0-6
  startTime: timestamp('startTime').notNull(),
  endTime: timestamp('endTime').notNull(),
});

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'completed',
  'failed',
  'canceled',
]);

export const payment_links = pgTable('payment_links', {
  ...keys,
  bookingId: uuid('bookingId')
    .notNull()
    .references(() => bookings.id),
  amount: numeric('amount'),
  currency: text('currency'),
  provider: text('provider'),
  external_id: text('externalId'),
  status: paymentStatusEnum().default('pending'),
  expires_at: timestamp('expiresAt'),
  ...timestamps,
  ...auditFields,
});

export const settings = pgTable('settings', {
  ...keys,
  config: jsonb('config').default({}),
  ...timestamps,
  ...auditFields,
});

export const feedback = pgTable('feedback', {
  ...keys,
  tenantId: uuid('tenantId')
    .references(() => tenants.id)
    .notNull(),
  rating: integer('rating'),
  comment: text('comment'),
  ...timestamps,
  ...auditFields,
});

export const apiKeyStatusEnum = pgEnum('api_key_status', [
  'active',
  'revoked',
  'expired',
  'revalidated',
]);

export const apiKeys = pgTable('api_keys', {
  ...keys,
  name: text('name').notNull(),
  keyHash: text('keyHash').notNull(),
  status: apiKeyStatusEnum().default('active'),
  lastUsedAt: timestamp('lastUsedAt'),
  revokedAt: timestamp('revokedAt'),
  ...timestamps,
  ...auditFields,
});
