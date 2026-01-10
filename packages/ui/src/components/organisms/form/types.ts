import type { z } from "zod";
import type { ComputedRef, InjectionKey, Ref } from "vue";

export type ErrorMap = Map<string, string>;
export type TouchedMap = Map<string, boolean>;
export type ErrorObject = Record<string, string>;
export type TouchedObject = Record<string, boolean>;
export type SubmitInvalidPayload = {
    errors: ErrorObject;
    errorMap: ErrorMap;
};
export type ResetOptions = {
    keepErrors?: boolean;
    keepTouched?: boolean;
};

export type SetValuesOptions = {
    shouldValidate?: boolean;
    shouldTouch?: boolean;
};

export type FormContext<T extends Record<string, any>> = {
    // inputs
    state: T;
    schema: z.ZodType<T>;
    validateOnChange: Ref<boolean>;
    isSubmitting: Ref<boolean>;
    // maps
    errors: Ref<ErrorMap>;
    // object views (template-friendly)
    errorsObject: ComputedRef<ErrorObject>;
    touchedObject: ComputedRef<TouchedObject>;
    isValid: ComputedRef<boolean>;
    // methods
    setTouched: (name: string, value?: boolean) => void;
    isTouched: (name: string) => boolean;
    // errors
    getError: (name: string) => string | undefined;
    hasError: (name: string) => boolean;
    setError: (name: string, message: string) => void;
    setErrors: (input: Record<string, string>) => void;
    clearError: (name: string) => void;
    clearAllErrors: () => void;
    // validation
    validateForm: () => Promise<boolean>;
    validateField: (name: string) => Promise<boolean>;
    // path helpers
    getValue: (path: string) => any;
    setValue: (path: string, value: any) => void;
    // submit helper
    markErrorsAsTouched: () => void;
    // form-level helpers
    reset(options?: ResetOptions): void;
    setValues(values: Partial<T>, options?: SetValuesOptions): void;
};

export const FORM_CONTEXT_KEY: InjectionKey<FormContext<any>> =
    Symbol("FORM_CONTEXT_KEY");

export type FormProps<T extends Record<string, any>> = {
    form?: FormContext<T>;
    schema: z.ZodType<T>;
    state: T;
    validateOnChange?: boolean;
    class?: string;
};

export type FieldArrayItem<T> = {
    key: string;
    value: T;
};
