import { computed, inject } from "vue";
import { FORM_CONTEXT_KEY } from "../types";

export function useFormArray<T = any>(name: string) {
    const form = inject(FORM_CONTEXT_KEY);
    if (!form) {
        throw new Error("useFormArray must be used inside <Form>");
    }

    const items = computed<T[]>({
        get() {
            return (form.state.value as any)[name] ?? [];
        },
        set(val) {
            (form.state.value as any)[name] = val;
        },
    });

    function push(value: T) {
        items.value = [...items.value, value];
    }

    function remove(index: number) {
        items.value = items.value.filter((_, i) => i !== index);
    }

    function replace(index: number, value: T) {
        items.value = items.value.map((v, i) => (i === index ? value : v));
    }

    function clear() {
        items.value = [];
    }

    return {
        items,
        push,
        remove,
        replace,
        clear,
    };
}
