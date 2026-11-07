export declare const ZColumn: import("atomico/types/dom").Atomico<{
    props: {
        inset: StringConstructor;
        insetX: StringConstructor;
        insetY: StringConstructor;
        gap: {
            readonly type: StringConstructor;
        };
        padding: {
            readonly type: StringConstructor;
        };
        margin: {
            readonly type: StringConstructor;
        };
        alignsX: {
            type: import("atomico").CustomType<"end" | "center" | "start" | "between" | "around" | "evenly" | "stretch">;
        };
        alignsY: {
            type: import("atomico").CustomType<"end" | "center" | "start" | "between" | "around" | "evenly" | "stretch">;
        };
        doesWrap: {
            type: BooleanConstructor;
            reflect: boolean;
        };
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
