export declare const ZChipGroup: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: import("atomico").CustomType<string[]>;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        kind: {
            type: import("atomico").CustomType<"outline" | "soft">;
            reflect: boolean;
        };
        isMultiple: {
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
    styles: import("atomico").Sheet[];
    form: true;
}>;
