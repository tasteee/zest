export declare const ZInput: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        type: {
            type: import("atomico").CustomType<"number" | "search" | "text" | "password" | "email" | "tel" | "url">;
        };
        placeholder: StringConstructor;
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        autocomplete: StringConstructor;
        inputmode: StringConstructor;
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
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
        isInline: {
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
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
