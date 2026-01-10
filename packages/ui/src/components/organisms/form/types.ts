import type { ComputedRef, InjectionKey, Ref, PropType } from "vue";
import type { z } from "zod";

export type AnyZodSchema = z.ZodTypeAny;

export type ErrorMap = Map<string, string>;
export type TouchedMap = Map<string, boolean>;

export type ErrorObject = Record<string, string>;
export type TouchedObject = Record<string, boolean>;

export type SubmitInvalidPayload = {
    errors: ErrorObject;
    errorMap: ErrorMap;
};

export type FormContext<T extends Record<string, any>> = {
    // inputs
    state: T;
    schema: AnyZodSchema;
    validateOnChange: Ref<boolean>;

    // maps
    errors: Ref<ErrorMap>;
    touched: Ref<TouchedMap>;

    // object views (template-friendly)
    errorsObject: ComputedRef<ErrorObject>;
    touchedObject: ComputedRef<TouchedObject>;
    isValid: ComputedRef<boolean>;

    // methods
    setTouched: (name: string, value?: boolean) => void;
    isTouched: (name: string) => boolean;

    getError: (name: string) => string | undefined;
    hasError: (name: string) => boolean;
    setError: (name: string, message: string) => void;
    clearError: (name: string) => void;
    clearAllErrors: () => void;

    validateForm: () => Promise<boolean>;
    validateField: (name: string) => Promise<boolean>;

    // path helpers
    getValue: (path: string) => any;
    setValue: (path: string, value: any) => void;

    // submit helper
    markErrorsAsTouched: () => void;
};

export const FORM_CONTEXT_KEY: InjectionKey<FormContext<any>> =
    Symbol("FORM_CONTEXT_KEY");

export type FormProps<T extends Record<string, any>> = {
    schema: AnyZodSchema;
    state: T;
    validateOnChange?: boolean;
    class?: string;
};