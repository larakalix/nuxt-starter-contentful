import { z } from "zod";
import type {
    FormType,
    SectionFormFields,
} from "@starter/content/section-types";

type SchemaFactory = (opts: {
    required?: boolean;
    message?: string;
}) => z.ZodTypeAny;

export const SCHEMA_FACTORIES: Record<FormType, SchemaFactory> = {
    text: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    email: ({ required, message }) =>
        required ? z.string().email(message) : z.string().email().optional(),
    date: ({ required, message }) => {
        let schema = z.date({
            error: message ?? "Invalid date",
        });

        return required ? schema : schema.optional();
    },
    checkbox: () => z.boolean().optional(),
    switch: () => z.boolean().optional(),
    select: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    "date-range": ({ required, message }) =>
        required
            ? z.object({
                  start: z.string().min(1, message),
                  end: z.string().min(1, message),
              })
            : z
                  .object({
                      start: z.string().optional(),
                      end: z.string().optional(),
                  })
                  .optional(),
    time: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    color: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    number: ({ required, message }) =>
        required
            ? z.number({ error: message }).min(1, message)
            : z.number().optional(),
    password: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    tel: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    url: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    radio: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
    textarea: ({ required, message }) =>
        required ? z.string().min(1, message) : z.string().optional(),
};

export function buildSchema(fields: SectionFormFields[]) {
    const shape: Record<string, z.ZodTypeAny> = {};

    for (const field of fields) {
        const factory = SCHEMA_FACTORIES[field.type];

        shape[field.name] = factory({
            required: field.validation?.required,
            message: field.validation?.errorMessage ?? "This field is required",
        });
    }

    return z.object(shape);
}

// export function buildSchema(fields: SectionFormFields[]) {
//     const shape: Record<string, z.ZodTypeAny> = {};

//     for (const field of fields) {
//         const required = field.validation?.required;
//         const message =
//             field.validation?.errorMessage ?? "This field is required";

//         switch (field.type) {
//             case "text":
//                 shape[field.name] = required
//                     ? z.string().min(1, message)
//                     : z.string().optional();
//                 break;

//             case "email":
//                 shape[field.name] = required
//                     ? z.email(message)
//                     : z.email().optional();
//                 break;

//             case "date":
//                 shape[field.name] = required
//                     ? z.string().min(1, message)
//                     : z.string().optional();
//                 break;

//             case "checkbox":
//             case "switch":
//                 shape[field.name] = z.boolean().optional();
//                 break;

//             default:
//                 shape[field.name] = z.any();
//         }
//     }

//     return z.object(shape);
// }
