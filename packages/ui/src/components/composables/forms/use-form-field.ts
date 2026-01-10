import { computed, inject } from "vue";
import { normalizePath } from "./../../../utils/path.utils";
import { FORM_CONTEXT_KEY, type FormContext } from "../../organisms";

export type FieldBinding = {
    name: string;
    modelValue: any;
    "onUpdate:modelValue": (v: any) => void;
    onBlur: () => void;
};

export function useFormField<T extends Record<string, any>, V = any>(
    name: string
) {
    const ctx = inject<FormContext<T>>(FORM_CONTEXT_KEY);
    if (!ctx) throw new Error("useInitForm() must be used inside <Form>.");

    const form = ctx as FormContext<T>;

    const fieldName = normalizePath(name);

    const value = computed<V>({
        get: () => form.getValue(fieldName) as V,
        set: (v) => form.setValue(fieldName, v),
    });

    const touched = computed(() => form.isTouched(fieldName));
    const error = computed(() => form.getError(fieldName));
    const invalid = computed(() => touched.value && Boolean(error.value));

    async function onBlur() {
        form.setTouched(fieldName, true);
        await form.validateField(fieldName);
    }

    async function onChange(v: any) {
        value.value = v;
        // validate on change only after touched + form-level flag
        if (form.validateOnChange.value && form.isTouched(fieldName)) {
            await form.validateField(fieldName);
        }
    }

    const field = computed<FieldBinding>(() => ({
        name: fieldName,
        modelValue: value.value,
        "onUpdate:modelValue": onChange,
        onBlur,
    }));

    return {
        name: fieldName,
        value,
        touched,
        error,
        invalid,
        field,
        validate: () => form.validateField(fieldName),
        setTouched: (v = true) => form.setTouched(fieldName, v),
    };
}
