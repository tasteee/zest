export declare const ZInput: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        type: StringConstructor;
        placeholder: StringConstructor;
        name: StringConstructor;
        autocomplete: StringConstructor;
        inputmode: StringConstructor;
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isFocused: {
            type: BooleanConstructor;
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
        inline: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        input: import("atomico").EventProp<{
            value: string;
        }>;
        change: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
