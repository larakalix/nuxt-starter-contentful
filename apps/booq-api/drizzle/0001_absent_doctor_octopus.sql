CREATE TYPE "public"."resource_status" AS ENUM('available', 'unavailable', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('service', 'product', 'room', 'equipment');--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "type" SET DATA TYPE "public"."resource_type" USING "type"::"public"."resource_type";--> statement-breakpoint
ALTER TABLE "tenants" ALTER COLUMN "timeZone" SET DEFAULT 'America/New_York';--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "status" "resource_status" DEFAULT 'available';