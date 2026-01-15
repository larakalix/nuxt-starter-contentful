import type {
    FormType,
    SectionFormFields,
} from "@starter/content/section-types";

type StateFactory = (field: { defaultValue?: unknown }) => unknown;

export const STATE_FACTORIES: Record<FormType, StateFactory> = {
    text: ({ defaultValue }) => defaultValue ?? "",
    email: ({ defaultValue }) => defaultValue ?? "",
    password: ({ defaultValue }) => defaultValue ?? "",
    tel: ({ defaultValue }) => defaultValue ?? "",
    url: ({ defaultValue }) => defaultValue ?? "",
    textarea: ({ defaultValue }) => defaultValue ?? "",
    select: ({ defaultValue }) => defaultValue ?? "",
    radio: ({ defaultValue }) => defaultValue ?? "",
    color: ({ defaultValue }) => defaultValue ?? "",
    time: ({ defaultValue }) => defaultValue ?? "",
    number: ({ defaultValue }) =>
        typeof defaultValue === "number" ? defaultValue : undefined,
    checkbox: ({ defaultValue }) =>
        typeof defaultValue === "boolean" ? defaultValue : false,
    switch: ({ defaultValue }) =>
        typeof defaultValue === "boolean" ? defaultValue : false,
    date: ({ defaultValue }) => {
        if (!defaultValue) return null;
        const d =
            defaultValue instanceof Date
                ? defaultValue
                : new Date(defaultValue as string);
        return isNaN(d.getTime()) ? null : d;
    },
    "date-range": ({ defaultValue }) => {
        if (!defaultValue || typeof defaultValue !== "object") {
            return { start: null, end: null };
        }

        const { start, end } = defaultValue as {
            start?: string | Date;
            end?: string | Date;
        };

        return {
            start: start ? new Date(start) : null,
            end: end ? new Date(end) : null,
        };
    },
};

export function buildState(fields: SectionFormFields[]) {
    const state: Record<string, any> = {};

    for (const field of fields) {
        if (field.defaultValue !== undefined) {
            if (field.type === "date") {
                state[field.name] =
                    field.defaultValue instanceof Date
                        ? field.defaultValue
                        : new Date(field.defaultValue as string);
            } else {
                state[field.name] = field.defaultValue;
            }
            continue;
        }

        switch (field.type) {
            case "checkbox":
            case "switch":
                state[field.name] = false;
                break;
            case "date":
                state[field.name] = null;
                break;
            default:
                state[field.name] = "";
        }
    }

    return state;
}
