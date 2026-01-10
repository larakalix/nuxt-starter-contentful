import { computed, ref } from "vue";
import { generateNanoid } from "./../../../../utils/string.utils";
import { validateFormContext } from "./use-form";
import {
    getByPath,
    normalizePath,
    setByPath,
} from "./../../../../utils/path.utils";

type FieldArrayItem<T> = {
    key: string;
    value: T;
};

export function useFieldArray<T extends Record<string, any>, TItem = any>(
    name: string
) {
    const form = validateFormContext<T>();
    const path = normalizePath(name);

    // Internal keys (never exposed to form state)
    const keys = ref<string[]>([]);

    const values = computed<TItem[]>(() => {
        const arr = getByPath(form.state, path);
        return Array.isArray(arr) ? arr : [];
    });

    // Sync keys with values length
    function syncKeys() {
        while (keys.value.length < values.value.length) {
            keys.value.push(generateNanoid());
        }
        while (keys.value.length > values.value.length) {
            keys.value.pop();
        }
    }

    syncKeys();

    const fields = computed<FieldArrayItem<TItem>[]>(() => {
        syncKeys();
        return values.value.map((value, index) => ({
            key: keys.value[index],
            value,
        }));
    });

    // Helpers
    function update(next: TItem[]) {
        setByPath(form.state, path, next);
        form.validateForm();
    }

    function append(value: TItem) {
        update([...values.value, value]);
        keys.value.push(generateNanoid());
    }

    function prepend(value: TItem) {
        update([value, ...values.value]);
        keys.value.unshift(generateNanoid());
    }

    function insert(index: number, value: TItem) {
        const next = [...values.value];
        next.splice(index, 0, value);
        update(next);
        keys.value.splice(index, 0, generateNanoid());
    }

    function remove(index: number) {
        const next = [...values.value];
        next.splice(index, 1);

        setByPath(form.state, path, next);

        for (const key of form.errors.value.keys()) {
            if (key.startsWith(`${path}.${index}`)) {
                form.clearError(key);
            }
        }
    }

    function swap(a: number, b: number) {
        const next = [...values.value];
        [next[a], next[b]] = [next[b], next[a]];
        update(next);
        [keys.value[a], keys.value[b]] = [keys.value[b], keys.value[a]];
    }

    function move(from: number, to: number) {
        const next = [...values.value];
        const item = next.splice(from, 1)[0];
        next.splice(to, 0, item);

        const key = keys.value.splice(from, 1)[0];
        keys.value.splice(to, 0, key);

        update(next);
    }

    function replace(next: TItem[]) {
        keys.value = next.map(() => generateNanoid());
        update(next);
    }

    return {
        fields,
        append,
        prepend,
        insert,
        remove,
        swap,
        move,
        replace,
    };
}
