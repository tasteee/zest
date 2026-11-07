export declare const ZDisplay: import("atomico/types/dom").Atomico<{
    props: {
        size: {
            type: import("atomico").CustomType<"xl" | "lg" | "md" | "sm">;
            reflect: boolean;
        };
        color: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "muted" | "strong">;
            reflect: boolean;
        };
        weight: {
            type: NumberConstructor;
            reflect: boolean;
        };
        tag: StringConstructor;
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet;
}>;
