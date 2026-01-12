import type { RootProps as VueDatePickerProps } from "@vuepic/vue-datepicker";

export type DatePickerProps = VueDatePickerProps & {
    disabled?: boolean;
    class?: string;
};
