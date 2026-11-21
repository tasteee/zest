export declare const ZRating: import("atomico/types/dom").Atomico<{
    props: {
        value: {
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
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        shape: {
            type: import("atomico").CustomType<"circle" | "star" | "heart">;
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
        doesShowValue: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        canClear: {
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
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            value: number;
        }>;
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: import("atomico").Sheet[];
    form: true;
}>;
