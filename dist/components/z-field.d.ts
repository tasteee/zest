export declare const ZField: import("atomico/types/dom").Atomico<{
    props: {
        label: StringConstructor;
        description: StringConstructor;
        error: StringConstructor;
        isRequired: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isLabelHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isLabelReserved: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHorizontal: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
