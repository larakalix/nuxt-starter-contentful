CREATE TYPE "public"."api_key_status" AS ENUM('active', 'revoked', 'expired', 'revalidated');--> statement-breakpoint
CREATE TYPE "public"."appointment_status" AS ENUM('scheduled', 'completed', 'canceled', 'no_show', 'rescheduled', 'pending', 'confirmed', 'awaiting_payment');--> statement-breakpoint
CREATE TYPE "public"."availability_kind" AS ENUM('resource', 'participant');--> statement-breakpoint
CREATE TYPE "public"."availability_status" AS ENUM('active', 'released', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."booking_mode" AS ENUM('single', 'recurring', 'crowd', 'on_demand', 'subscription');--> statement-breakpoint
CREATE TYPE "public"."language_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."resource_booking_mode" AS ENUM('exclusive', 'capacity', 'online');--> statement-breakpoint
CREATE TYPE "public"."resource_status" AS ENUM('available', 'unavailable', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('service', 'product', 'room', 'equipment');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('active', 'inactive', 'suspended', 'on_board', 'on_trial');--> statement-breakpoint
CREATE TYPE "public"."tenant_type" AS ENUM('car_rental', 'hotel', 'doctor', 'salon', 'fitness', 'education', 'other');--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"name" text NOT NULL,
	"keyHash" text NOT NULL,
	"status" "api_key_status" DEFAULT 'active',
	"lastUsedAt" timestamp,
	"revokedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "availability_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"bookingId" uuid NOT NULL,
	"kind" "availability_kind" NOT NULL,
	"targetId" uuid NOT NULL,
	"type" "resource_booking_mode" DEFAULT 'exclusive',
	"startAt" timestamp with time zone NOT NULL,
	"endAt" timestamp with time zone,
	"status" "availability_status" DEFAULT 'active',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE "booking_participants" (
	"bookingId" uuid NOT NULL,
	"participantId" uuid NOT NULL,
	CONSTRAINT "booking_participants_bookingId_participantId_pk" PRIMARY KEY("bookingId","participantId")
);
--> statement-breakpoint
CREATE TABLE "booking_resources" (
	"bookingId" uuid NOT NULL,
	"resourceId" uuid NOT NULL,
	CONSTRAINT "booking_resources_bookingId_resourceId_pk" PRIMARY KEY("bookingId","resourceId")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"startAt" timestamp with time zone NOT NULL,
	"endAt" timestamp with time zone,
	"note" text,
	"quantity" integer DEFAULT 1,
	"type" "tenant_type" DEFAULT 'other',
	"bookingMode" "booking_mode" DEFAULT 'single',
	"status" "appointment_status" DEFAULT 'scheduled',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"name" text NOT NULL,
	"percentage" integer,
	"cents" integer,
	"type" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"rating" integer,
	"comment" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "languages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"nativeName" text,
	"code" text NOT NULL,
	"isDefault" text DEFAULT 'false',
	"status" "language_status" DEFAULT 'active',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE "participant_categories" (
	"participantId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT "participant_categories_participantId_categoryId_pk" PRIMARY KEY("participantId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"name" text NOT NULL,
	"role" varchar(50) NOT NULL,
	"email" text,
	"phone" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"bookingId" uuid NOT NULL,
	"amount" numeric,
	"currency" text,
	"provider" text,
	"externalId" text,
	"status" "payment_status" DEFAULT 'pending',
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_categories" (
	"resourceId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT "resource_categories_resourceId_categoryId_pk" PRIMARY KEY("resourceId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"name" text NOT NULL,
	"type" "resource_type" NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"attributes" jsonb,
	"status" "resource_status" DEFAULT 'available',
	"bookingMode" "resource_booking_mode" DEFAULT 'exclusive',
	"email" text,
	"phone" text,
	"bufferBeforeMinutes" integer DEFAULT 0,
	"bufferAfterMinutes" integer DEFAULT 0,
	"capacity" integer DEFAULT 1,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	"deletedBy" uuid,
	"updatedBy" uuid,
	"createdBy" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"logoUrl" text,
	"currency" text DEFAULT 'USD',
	"country" text DEFAULT 'US',
	"type" "tenant_type" DEFAULT 'other',
	"timeZone" text DEFAULT 'America/New_York',
	"status" "tenant_status" DEFAULT 'on_trial',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"role" text DEFAULT 'admin',
	"passwordHash" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT NULL,
	"deletedAt" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE "working_hours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenantId" uuid NOT NULL,
	"kind" "availability_kind" NOT NULL,
	"targetId" uuid NOT NULL,
	"dayOfWeek" integer NOT NULL,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability_blocks" ADD CONSTRAINT "availability_blocks_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability_blocks" ADD CONSTRAINT "availability_blocks_bookingId_bookings_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_participants" ADD CONSTRAINT "booking_participants_bookingId_bookings_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_participants" ADD CONSTRAINT "booking_participants_participantId_participants_id_fk" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_resources" ADD CONSTRAINT "booking_resources_bookingId_bookings_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_resources" ADD CONSTRAINT "booking_resources_resourceId_resources_id_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participant_categories" ADD CONSTRAINT "participant_categories_participantId_participants_id_fk" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participant_categories" ADD CONSTRAINT "participant_categories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_bookingId_bookings_id_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_categories" ADD CONSTRAINT "resource_categories_resourceId_resources_id_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."resources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_categories" ADD CONSTRAINT "resource_categories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "working_hours" ADD CONSTRAINT "working_hours_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "availability_blocks_booking_kind_target_uniq" ON "availability_blocks" USING btree ("bookingId","kind","targetId");

-- Required for exclusion constraints
CREATE EXTENSION IF NOT EXISTS btree_gist; 
-- Prevent overlapping availability blocks
ALTER TABLE "availability_blocks"
ADD CONSTRAINT "no_overlapping_availability_blocks"
EXCLUDE USING gist ("tenantId" WITH =, "kind" WITH =, "targetId" WITH =, tstzrange( "startAt", COALESCE("endAt", 'infinity'::timestamptz) ) WITH && )
WHERE (status = 'active' AND type = 'exclusive');
