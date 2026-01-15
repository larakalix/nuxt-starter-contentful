export type FieldValidator = (value: unknown) => Promise<string | null>;

export type FormFieldProps = {
    name: string;
    label?: string;
    description?: string;
    class?: string;
    required?: boolean;
};
