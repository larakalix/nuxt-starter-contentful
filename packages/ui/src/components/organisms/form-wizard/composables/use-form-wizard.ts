import { inject, type Ref, type InjectionKey, type ComputedRef } from "vue";
import type { WizardStep } from "../../../molecules";

export interface FormWizardContext {
    steps: WizardStep[];
    current: Ref<string>;
    index: Ref<number>;
    isFirst: ComputedRef<boolean>;
    isLast: ComputedRef<boolean>;
    canProceed: ComputedRef<boolean>;
    next(): void;
    previous(): void;
    setStepValid(step: string, valid: boolean): void;
}

export const FORM_WIZARD_KEY: InjectionKey<FormWizardContext> =
    Symbol("FORM_WIZARD_KEY");

export function useFormWizard(): FormWizardContext {
    const wizard = inject(FORM_WIZARD_KEY);
    if (!wizard) {
        throw new Error("useFormWizard must be used inside <FormWizard>");
    }

    return wizard;
}
