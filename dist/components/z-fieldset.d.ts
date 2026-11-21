export declare const ZFieldset: import("atomico/types/dom").Atomico<{
    props: {
        legend: StringConstructor;
        description: StringConstructor;
        error: StringConstructor;
        kind: {
            type: import("atomico").CustomType<"outline" | "soft" | "plain">;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md">;
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
        isHorizontal: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isLegendHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
