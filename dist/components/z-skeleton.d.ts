export declare const ZSkeleton: import("atomico/types/dom").Atomico<{
    props: {
        shape: {
            type: import("atomico").CustomType<"text" | "circle" | "rect">;
            reflect: boolean;
        };
        width: StringConstructor;
        height: StringConstructor;
        lines: {
            type: NumberConstructor;
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
    };
    styles: CSSStyleSheet[];
}>;
