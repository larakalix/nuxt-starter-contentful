import { z } from "zod";

export function schemaToFields(schema: z.ZodTypeAny) {
    if (!(schema instanceof z.ZodObject)) return [];

    const shape = schema.shape;

    return Object.entries(shape).map(([name, fieldSchema]) => {
        const def = fieldSchema._def;

        let type = "text";

        if (fieldSchema instanceof z.ZodNumber) {
            type = "number";
        }

        if (fieldSchema instanceof z.ZodBoolean) {
            type = "checkbox";
        }

        return {
            name,
            type,
            required: !fieldSchema.isOptional(),
        };
    });
}
