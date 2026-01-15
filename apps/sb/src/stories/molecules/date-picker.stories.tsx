import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { DatePicker } from "@starter/ui/molecules/date-picker";

const meta = {
    title: "Molecules/Date Picker",
    component: DatePicker,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The DatePicker component allows users to select a date or a range of dates from a calendar interface. It can be used in forms, filters, or anywhere a date input is required.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        modelValue: {
            control: { type: "date" },
        },
        range: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
    modelValue: null,
    range: false,
    disabled: false,
    class: "",
} satisfies Partial<typeof DatePicker.props>;

export const Default: Story = {
    args: {
        ...defaultProps,
    },
};

export const WithValue: Story = {
    args: {
        ...defaultProps,
        modelValue: "2026-01-15T06:45:00.000Z",
    },
};

export const Range: Story = {
    args: {
        ...defaultProps,
        range: true,
    },
};

export const WithRangeValue: Story = {
    args: {
        ...defaultProps,
        range: true,
        modelValue: ["2026-06-01T06:28:00.000Z", "2026-08-24T06:28:00.000Z"],
    },
};

export const Disabled: Story = {
    args: {
        ...defaultProps,
        disabled: true,
    },
};

export const MultiCalendars: Story = {
    args: {
        ...defaultProps,
        multiCalendars: true,
    },
};

export const TimePicker: Story = {
    args: {
        ...defaultProps,
        timePicker: true,
    },
};

export const MonthPicker: Story = {
    args: {
        ...defaultProps,
        monthPicker: true,
    },
};

export const YearPicker: Story = {
    args: {
        ...defaultProps,
        yearPicker: true,
    },
};

export const QuarterPicker: Story = {
    args: {
        ...defaultProps,
        quarterPicker: true,
    },
};
