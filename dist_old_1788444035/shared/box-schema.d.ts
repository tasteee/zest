export declare const boxBooleanProps: {
    readonly inline: {
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
        readonly type: StringConstructor;
        readonly reflect: true;
    };
    readonly alignsX: StringConstructor;
    readonly alignsY: StringConstructor;
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
        readonly type: StringConstructor;
        readonly reflect: true;
    };
    alignsX: StringConstructor;
    alignsY: StringConstructor;
    inline: {
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
