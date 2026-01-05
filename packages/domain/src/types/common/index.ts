import { z } from "zod";

export const CommonSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
});

export const LanguageCodeSchema = z.string().min(2).max(10);

export const ContactSchema = z.object({
    email: z.email().optional(),
    phone: z.string().optional(),
});

export const AuditSchema = z.object({
    createdAt: z.date().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.date().optional(),
    updatedBy: z.string().optional(),
    deletedAt: z.date().optional(),
    deletedBy: z.string().optional(),
});

export const CategorySchema = z
    .object({
        name: z.string(),
        description: z.string().optional(),
    })
    .extend(CommonSchema.shape)
    .extend(AuditSchema.shape);

export const ResourceSchema = z
    .object({
        name: z.string(),
        type: z.enum(["car", "hotel", "doctor", "saloon", "property", "other"]),
        description: z.string().optional(),
        price: z.number().int(),
        attributes: z
            .array(
                z.object({
                    key: z.string(),
                    label: z.string(),
                    description: z.string().optional(),
                })
            )
            .optional(),
    })
    .extend(ContactSchema.shape)
    .extend(AuditSchema.shape);

export const ResourceCategorySchema = z.object({
    resourceId: z.string(),
    categoryId: z.string(),
});

export const ParticipantSchema = z
    .object({
        name: z.string(),
        role: z.string(),
    })
    .extend(CommonSchema.shape)
    .extend(ContactSchema.shape)
    .extend(AuditSchema.shape);

export const ParticipantCategorySchema = z.object({
    participantId: z.string(),
    categoryId: z.string(),
});

export const DiscountSchema = z
    .object({
        name: z.string(),
        percentage: z.number().int().optional(),
        cents: z.number().int().optional(),
        type: z.enum(["coupon", "seasonal", "promotional"]),
    })
    .extend(CommonSchema.shape)
    .extend(AuditSchema.shape)
    .refine((d) => (d.percentage ? !d.cents : !!d.cents), {
        message: "Either percentage or cents must be provided, not both",
    });

export const BookingSchema = z
    .object({
        startAt: z.date(),
        endAt: z.date().nullable(),
        resourceIds: z.array(z.string()).min(1),
        participantIds: z.array(z.string()).optional(),
        note: z.string().optional(),
        status: z.enum([
            "scheduled",
            "completed",
            "canceled",
            "no_show",
            "rescheduled",
            "pending",
            "confirmed",
            "awaiting_payment",
        ]),
    })
    .extend(CommonSchema.shape)
    .extend(AuditSchema.shape);

export type Category = z.infer<typeof CategorySchema>;
export type Resource = z.infer<typeof ResourceSchema>;
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type ParticipantCategory = z.infer<typeof ParticipantCategorySchema>;
export type Discount = z.infer<typeof DiscountSchema>;
export type Booking = z.infer<typeof BookingSchema>;
