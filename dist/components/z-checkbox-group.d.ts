import './z-checkbox';
export declare const ZCheckboxGroup: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: import("atomico").CustomType<string[]>;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        min: {
            type: NumberConstructor;
            reflect: boolean;
        };
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
        selectAllLabel: StringConstructor;
        hasSelectAll: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHorizontal: {
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
        change: import("atomico").EventProp<{
            value: string[];
        }>;
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
