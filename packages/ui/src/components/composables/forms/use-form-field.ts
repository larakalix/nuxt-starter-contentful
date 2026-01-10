import { inject, computed, onMounted, onUnmounted } from "vue";
import { FORM_CONTEXT } from "../../organisms/form";
import type { FieldValidator } from "../../molecules/form-field";

export function useFormField<T = any>(name: string, validate?: FieldValidator) {
    const form = inject(FORM_CONTEXT);
    if (!form) throw new Error("useFormField must be used inside <Form>");

    onMounted(() => form.register(name));
    onUnmounted(() => form.unregister(name));

    const model = computed<T>({
        get: () => form.state.value[name] as T,
        set: (v) => {
            form.state.value[name] = v;
            form.touched.add(name);
        },
    });

    const error = computed(() => form.errors.value[name]);
    const invalid = computed(() => Boolean(error.value));

    const meta = {
        touched: computed(() => form.touched.has(name)),
        blurred: computed(() => form.blurred.has(name)),
        dirty: computed(() => form.dirty.has(name)),
    };

    async function validateField() {
        if (!form || !validate) return;
        const message = await validate(model.value);
        if (message) form.errors.value[name] = message;
        else delete form.errors.value[name];
    }

    async function onBlur() {
        if (!form) return;
        form.setBlurred(name);
        form.markTouched?.(name);
        await validateField();
    }

    async function onInput() {
        if (!form) return;
        form.setTouched(name);
        form.markTouched?.(name);
        await validateField();
    }

    return {
        model,
        "onUpdate:modelValue": (v: T) => {
            model.value = v;
        },
        "aria-invalid": !!error.value,
        meta,
        name,
        error,
        id: `field-${name}`,
        onBlur,
        onInput,
    };
}
