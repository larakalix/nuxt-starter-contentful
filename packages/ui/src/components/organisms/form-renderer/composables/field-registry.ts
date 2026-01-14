import { Checkbox, Input, Select, Switch } from "../../../atoms";
import { DatePicker } from "../../../molecules";

export const FIELD_COMPONENTS = {
    text: Input,
    email: Input,
    select: Select,
    switch: Switch,
    checkbox: Switch,
    date: DatePicker,
} as const;

export type FormType = keyof typeof FIELD_COMPONENTS;
