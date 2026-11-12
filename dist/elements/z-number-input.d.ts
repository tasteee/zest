export declare const ZNumberInput: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: NumberConstructor;
            reflect: boolean;
        };
        min: {
            type: NumberConstructor;
            reflect: boolean;
        };
        max: {
            type: NumberConstructor;
            reflect: boolean;
        };
        step: {
            type: NumberConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        placeholder: StringConstructor;
        valuePrefix: StringConstructor;
        valueSuffix: StringConstructor;
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isInvalid: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isReadonly: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isRequired: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        hasStepperButtons: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isInline: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isBorderless: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        input: import("atomico").EventProp<{
            value: number | null;
            rawValue: string;
            isValid: boolean;
        }>;
        change: import("atomico").EventProp<{
            value: number;
        }>;
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: import("atomico").Sheet[];
    form: true;
}>;
