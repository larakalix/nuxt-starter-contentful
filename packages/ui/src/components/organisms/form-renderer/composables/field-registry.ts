import { defineAsyncComponent } from "vue";

export const FIELD_COMPONENTS = {
    text: defineAsyncComponent(() => import("./../../../atoms/input/input.vue")),
    email: defineAsyncComponent(() => import("./../../../atoms/input/input.vue")),
    select: defineAsyncComponent(() => import("./../../../atoms/select/select.vue")),
    switch: defineAsyncComponent(() => import("./../../../atoms/switch/switch.vue")),
    checkbox: defineAsyncComponent(() => import("./../../../atoms/switch/switch.vue")),
    date: defineAsyncComponent(() => import("./../../../molecules/date-picker/date-picker.vue")),
} as const;

export type FormType = keyof typeof FIELD_COMPONENTS;
