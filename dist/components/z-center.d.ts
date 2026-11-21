export declare const ZCenter: import("atomico/types/dom").Atomico<{
    props: {
        inset: StringConstructor;
        insetX: StringConstructor;
        insetY: StringConstructor;
        alignsX: {
            type: import("atomico").CustomType<"end" | "center" | "start">;
        };
        alignsY: {
            type: import("atomico").CustomType<"end" | "center" | "start">;
        };
        doesCenterBoth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        maxWidth: StringConstructor;
        doesCenterText: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        minHeight: StringConstructor;
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullHeight: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
