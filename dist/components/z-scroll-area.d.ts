export declare const ZScrollArea: import("atomico/types/dom").Atomico<{
    props: {
        inset: StringConstructor;
        insetX: StringConstructor;
        insetY: StringConstructor;
        direction: {
            type: import("atomico").CustomType<"horizontal" | "vertical" | "both">;
            reflect: boolean;
        };
        maxHeight: StringConstructor;
        height: StringConstructor;
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        maxWidth: StringConstructor;
        overscroll: {
            type: import("atomico").CustomType<"contain" | "auto" | "none">;
            reflect: boolean;
        };
        scrollbar: {
            type: import("atomico").CustomType<"hidden" | "auto" | "thin">;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
