export declare const ZCheckbox: import("atomico/types/dom").Atomico<{
    props: {
        isChecked: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isIndeterminate: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isRequired: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        value: StringConstructor;
        label: StringConstructor;
        change: import("atomico").EventProp<{
            checked: boolean;
            value?: string;
        }>;
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
