import type { z } from "zod";
import { computed, inject, reactive, ref } from "vue";
import { mapToObject, zodErrorsToMap } from "../../../../utils/form.utils";
import {
    FORM_CONTEXT_KEY,
    type ErrorMap,
    type FormContext,
    type FormProps,
    type ResetOptions,
    type SetValuesOptions,
    type TouchedMap,
} from "../";
import {
    getByPath,
    normalizePath,
    setByPath,
} from "../../../../utils/path.utils";

export function validateFormContext<T extends Record<string, any>>() {
    const ctx = inject<FormContext<T>>(FORM_CONTEXT_KEY);
    if (!ctx) throw new Error("useForm() must be used inside <Form>.");

    return ctx as FormContext<T>;
}

export function createFormContext<T extends Record<string, any>>(
    options: FormProps<T>
): FormContext<T> {
    // Form props
    const state = reactive(options.state) as T;
    const schema = options.schema as z.ZodType<T>;
    const validateOnChange = ref(Boolean(options.validateOnChange));

    const isSubmitting = ref(false);
    const errors = ref<ErrorMap>(new Map());
    const touched = ref<TouchedMap>(new Map());
    const errorsObject = computed(() => mapToObject(errors.value));
    const touchedObject = computed(() => mapToObject(touched.value));
    const isValid = computed(() => errors.value.size === 0);

    // Path helpers
    function getValue(path: string) {
        return getByPath(state, normalizePath(path));
    }

    function setValue(path: string, value: any) {
        setByPath(state, normalizePath(path), value);
    }

    // Touched
    function setTouched(name: string, value = true) {
        touched.value.set(normalizePath(name), value);
    }

    function isTouched(name: string) {
        return touched.value.get(normalizePath(name)) === true;
    }

    function markErrorsAsTouched() {
        for (const key of errors.value.keys()) {
            if (key === "_form") continue;
            touched.value.set(key, true);
        }
    }

    // Errors
    function getError(name: string) {
        return errors.value.get(normalizePath(name));
    }

    function hasError(name: string) {
        return errors.value.has(normalizePath(name));
    }

    function setError(name: string, message: string) {
        errors.value.set(normalizePath(name), message);
    }

    function setErrors(input: Record<string, string>) {
        errors.value.clear();
        for (const key in input) {
            errors.value.set(normalizePath(key), input[key]);
        }
    }

    function clearError(name: string) {
        errors.value.delete(normalizePath(name));
    }

    function clearAllErrors() {
        errors.value.clear();
    }

    // Validation
    async function validateFields(names: string[]): Promise<boolean> {
        const keys = names.map(normalizePath);

        const result = schema.safeParse(state);

        // If valid overall, clear only targeted errors
        if (result.success) {
            for (const k of keys) errors.value.delete(k);
            if (errors.value.has("_form")) errors.value.delete("_form");
            return true;
        }

        const next = zodErrorsToMap(result);

        // Update ONLY these keys
        for (const k of keys) {
            const msg = next.get(k);
            if (msg) errors.value.set(k, msg);
            else errors.value.delete(k);
        }

        // Keep/refresh form-level error if present
        if (next.has("_form")) errors.value.set("_form", next.get("_form")!);
        else errors.value.delete("_form");

        // valid if none of the targeted fields has error
        return keys.every((k) => !errors.value.has(k));
    }

    async function validateForm(): Promise<boolean> {
        const result = schema.safeParse(state);
        errors.value = zodErrorsToMap(result);
        return errors.value.size === 0;
    }

    async function validateField(name: string): Promise<boolean> {
        const key = normalizePath(name);

        const result = schema.safeParse(state);
        if (result.success) {
            errors.value.delete(key);
            if (errors.value.has("_form")) errors.value.delete("_form");
            return true;
        }

        const next = zodErrorsToMap(result);
        const nextMessage = next.get(key);

        if (nextMessage) errors.value.set(key, nextMessage);
        else errors.value.delete(key);

        if (next.has("_form")) errors.value.set("_form", next.get("_form")!);
        else errors.value.delete("_form");

        return !errors.value.has(key);
    }

    function reset(options: ResetOptions = {}) {
        if (!options.keepErrors) errors.value.clear();
        if (!options.keepTouched) touched.value.clear();
    }

    function setValues(values: Partial<T>, options: SetValuesOptions = {}) {
        for (const [key, value] of Object.entries(values)) {
            setValue(key, value);
            if (options.shouldTouch) setTouched(key);
        }

        if (options.shouldValidate) validateForm();
    }

    return {
        state,
        isSubmitting,
        schema,
        validateOnChange,
        errors,
        touchedObject,
        errorsObject,
        isValid,
        getValue,
        setValue,
        validateForm,
        validateField,
        validateFields,
        getError,
        hasError,
        setError,
        setErrors,
        clearError,
        clearAllErrors,
        setTouched,
        isTouched,
        markErrorsAsTouched,
        reset,
        setValues,
    } as FormContext<T>;
}

export function useForm<T extends Record<string, any>>(
    options: FormProps<T>
): FormContext<T> {
    return createFormContext(options);
}
