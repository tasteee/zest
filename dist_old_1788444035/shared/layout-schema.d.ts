export declare const resolveSize: (value?: string) => string | undefined;
export declare const resolveWidth: (value?: string) => string | undefined;
export declare const resolveRadius: (value?: string) => string | undefined;
export declare const resolveJustify: (value?: string) => string | undefined;
export declare const resolveAlign: (value?: string) => string | undefined;
export declare const resolveGridAlign: (value?: string) => string | undefined;
export declare const coerceSize: (value?: string | number) => string | undefined;
export declare const sizeProp: {
    readonly type: StringConstructor;
};
export declare const resolveEdge: (value?: string) => string | undefined;
type InsetPropsT = {
    inset?: string;
    insetX?: string;
    insetY?: string;
};
export declare const insetVars: (props: InsetPropsT, prefix: string) => Record<string, string>;
export declare const insetProps: {
    readonly inset: StringConstructor;
    readonly insetX: StringConstructor;
    readonly insetY: StringConstructor;
};
export declare const baseStyles: CSSStyleSheet;
export {};
