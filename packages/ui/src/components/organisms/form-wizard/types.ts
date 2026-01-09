export type WizardStep = {
    name: string;
    label?: string;
    optional?: boolean;
};

export type FormWizardProps = {
    steps: WizardStep[];
    initial?: string;
};
