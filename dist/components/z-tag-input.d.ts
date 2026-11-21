export declare const ZTagInput: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: import("atomico").CustomType<string[]>;
        };
        suggestions: {
            type: import("atomico").CustomType<string[]>;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        placeholder: StringConstructor;
        delimiter: StringConstructor;
        max: {
            type: NumberConstructor;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        canDuplicate: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDraftKeptOnBlur: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isInvalid: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isRequired: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isReadonly: {
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
        input: import("atomico").EventProp<{
            value: string;
        }>;
        change: import("atomico").EventProp<{
            value: string[];
        }>;
        add: import("atomico").EventProp<{
            value: string;
        }>;
        remove: import("atomico").EventProp<{
            value: string;
            index: number;
        }>;
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
