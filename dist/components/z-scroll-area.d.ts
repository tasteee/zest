export declare const ZScrollArea: import("atomico/types/dom").Atomico<{
    props: {
        maxHeight: StringConstructor;
        height: StringConstructor;
        direction: {
            type: import("atomico").CustomType<"horizontal" | "vertical" | "both">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
