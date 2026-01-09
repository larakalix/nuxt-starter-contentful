import type { InjectionKey, Ref } from "vue";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export type FormSchema<
    I extends object = object,
    O extends object = I
> = StandardSchemaV1<I, O>;

export type InferInput<S> = S extends StandardSchemaV1
    ? StandardSchemaV1.InferInput<S>
    : never;

export type InferOutput<S> = S extends StandardSchemaV1
    ? StandardSchemaV1.InferOutput<S>
    : never;

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type FormSubmitEvent<T> = SubmitEvent & {
    data: T;
};

export interface FormContext<T extends object = any> {
    state: Ref<Partial<T>>;
    errors: Ref<FormErrors<T>>;
    touched: Set<keyof T>;
    blurred: Set<keyof T>;
    dirty: Set<keyof T>;
    register(name: keyof T): void;
    unregister(name: keyof T): void;
    setTouched(name: keyof T): void;
    validate(): Promise<boolean>;
    setBlurred(name: keyof T): void;
    markBlurred(name: keyof T): void;
    markTouched(name: keyof T): void;
}

export const FORM_CONTEXT: InjectionKey<FormContext<any>> =
    Symbol("FORM_CONTEXT");
