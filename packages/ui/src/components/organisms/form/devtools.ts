import type { ZodAny } from "zod";
import type { FormContext } from "./types";

type DevtoolsForm = {
    id: string;
    form: FormContext<ZodAny>;
};

declare global {
    interface Window {
        __FORM_DEVTOOLS__?: {
            register(form: DevtoolsForm): void;
            unregister(id: string): void;
        };
    }
}
