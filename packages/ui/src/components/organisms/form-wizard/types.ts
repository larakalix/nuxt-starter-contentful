import type { InjectionKey, ComputedRef, Ref } from "vue";

export type WizardStepMeta = {
    name: string;
    label?: string;
    fields?: string[];
};

export type WizardContext = {
    currentStep: Ref<number>;
    steps: ComputedRef<WizardStepMeta[]>;
    isFirstStep: ComputedRef<boolean>;
    isLastStep: ComputedRef<boolean>;
    next(): Promise<void>;
    previous(): void;
    goTo(step: number): void;
    registerStep(step: WizardStepMeta): number;
    hasStepError(stepIndex: number): boolean;
    isStepVisited(stepIndex: number): boolean;
};

export const FORM_WIZARD_KEY: InjectionKey<WizardContext> =
    Symbol("FORM_WIZARD_KEY");
