export declare const ZGrid: import("atomico/types/dom").Atomico<{
    props: {
        inset: StringConstructor;
        insetX: StringConstructor;
        insetY: StringConstructor;
        columns: StringConstructor;
        minColumnWidth: StringConstructor;
        gap: {
            readonly type: StringConstructor;
        };
        gapX: {
            readonly type: StringConstructor;
        };
        gapY: {
            readonly type: StringConstructor;
        };
        alignsX: {
            type: import("atomico").CustomType<"end" | "center" | "start" | "stretch">;
        };
        alignsY: {
            type: import("atomico").CustomType<"end" | "center" | "start" | "stretch">;
        };
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet[];
}>;
