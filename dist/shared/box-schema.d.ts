export declare const resolveBoxSpacing: (value?: string | number) => string | undefined;
export declare const boxBooleanProps: {
    readonly isInline: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    readonly doesWrap: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    readonly doesWrapText: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    readonly isFullWidth: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    readonly isFullHeight: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
};
export declare const boxValueProps: {
    readonly inset: StringConstructor;
    readonly insetX: StringConstructor;
    readonly insetY: StringConstructor;
    readonly gap: StringConstructor;
    readonly rowGap: StringConstructor;
    readonly columnGap: StringConstructor;
    readonly margin: StringConstructor;
    readonly marginTop: StringConstructor;
    readonly marginRight: StringConstructor;
    readonly marginBottom: StringConstructor;
    readonly marginLeft: StringConstructor;
    readonly marginX: StringConstructor;
    readonly marginY: StringConstructor;
    readonly padding: StringConstructor;
    readonly paddingTop: StringConstructor;
    readonly paddingRight: StringConstructor;
    readonly paddingBottom: StringConstructor;
    readonly paddingLeft: StringConstructor;
    readonly paddingX: StringConstructor;
    readonly paddingY: StringConstructor;
    readonly width: StringConstructor;
    readonly minWidth: StringConstructor;
    readonly maxWidth: StringConstructor;
    readonly height: StringConstructor;
    readonly minHeight: StringConstructor;
    readonly maxHeight: StringConstructor;
    readonly direction: {
        readonly type: import("atomico").CustomType<"horizontal" | "vertical">;
        readonly reflect: true;
    };
    readonly display: {
        readonly type: import("atomico").CustomType<"flex" | "grid">;
        readonly reflect: true;
    };
    readonly columns: StringConstructor;
    readonly rows: StringConstructor;
    readonly smallColumns: StringConstructor;
    readonly mediumColumns: StringConstructor;
    readonly largeColumns: StringConstructor;
    readonly extraLargeColumns: StringConstructor;
    readonly alignsX: {
        readonly type: import("atomico").CustomType<"end" | "center" | "start" | "between" | "around" | "evenly" | "stretch">;
    };
    readonly alignsY: {
        readonly type: import("atomico").CustomType<"end" | "center" | "start" | "between" | "around" | "evenly" | "stretch">;
    };
};
export declare const boxProps: {
    inset: StringConstructor;
    insetX: StringConstructor;
    insetY: StringConstructor;
    gap: StringConstructor;
    rowGap: StringConstructor;
    columnGap: StringConstructor;
    margin: StringConstructor;
    marginTop: StringConstructor;
    marginRight: StringConstructor;
    marginBottom: StringConstructor;
    marginLeft: StringConstructor;
    marginX: StringConstructor;
    marginY: StringConstructor;
    padding: StringConstructor;
    paddingTop: StringConstructor;
    paddingRight: StringConstructor;
    paddingBottom: StringConstructor;
    paddingLeft: StringConstructor;
    paddingX: StringConstructor;
    paddingY: StringConstructor;
    width: StringConstructor;
    minWidth: StringConstructor;
    maxWidth: StringConstructor;
    height: StringConstructor;
    minHeight: StringConstructor;
    maxHeight: StringConstructor;
    direction: {
        readonly type: import("atomico").CustomType<"horizontal" | "vertical">;
        readonly reflect: true;
    };
    display: {
        readonly type: import("atomico").CustomType<"flex" | "grid">;
        readonly reflect: true;
    };
    columns: StringConstructor;
    rows: StringConstructor;
    smallColumns: StringConstructor;
    mediumColumns: StringConstructor;
    largeColumns: StringConstructor;
    extraLargeColumns: StringConstructor;
    alignsX: {
        readonly type: import("atomico").CustomType<"end" | "center" | "start" | "between" | "around" | "evenly" | "stretch">;
    };
    alignsY: {
        readonly type: import("atomico").CustomType<"end" | "center" | "start" | "between" | "around" | "evenly" | "stretch">;
    };
    isInline: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    doesWrap: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    doesWrapText: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    isFullWidth: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
    isFullHeight: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
};
export declare const directionLockedBoxProps: Record<string, unknown>;
type BoxHostPropsT = {
    [K in keyof typeof boxValueProps]?: string;
};
export declare const getBoxHostStyle: (props: BoxHostPropsT) => Record<string, string>;
export {};
