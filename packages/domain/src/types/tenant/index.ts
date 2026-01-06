import { z } from "zod";
import {
    AuditSchema,
    CommonSchema,
    ContactSchema,
    LanguageCodeSchema,
} from "../common";

export const TenantSchema = z
    .object({
        id: z.string(),
        slug: z.string(),
        name: z.string(),
        domain: z.string(),
        logoUrl: z.url().optional(),
        currency: z.string().default("USD"),
        country: z.string().default("US"),
        timeZone: z.string().default("America/New_York"),
        status: z
            .enum(["active", "inactive", "suspended", "on_board", "on_trial"])
            .default("on_trial"),
    })
    .extend(ContactSchema.shape)
    .extend(AuditSchema.shape);

export const TenantI18nConfigSchema = z.object({
    defaultLanguage: LanguageCodeSchema,
    fallbackLanguage: LanguageCodeSchema.optional(),
});

export const TenantLanguageSchema = z
    .object({
        code: LanguageCodeSchema,
        name: z.string(),
        nativeName: z.string().optional(),
        isDefault: z.boolean().default(false),
        status: z.enum(["active", "inactive"]).default("active"),
    })
    .extend(CommonSchema.shape)
    .extend(AuditSchema.shape);

export const CreateTenantSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    country: z.string().min(1, "Country is required"),
    domain: z.string().min(1, "Domain is required"),
    email: z.string().email("Invalid email address"),
});

export type Tenant = z.infer<typeof TenantSchema>;
export type TenantI18nConfig = z.infer<typeof TenantI18nConfigSchema>;
export type TenantLanguage = z.infer<typeof TenantLanguageSchema>;
