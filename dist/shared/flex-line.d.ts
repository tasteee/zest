export type FlexLinePropsT = {
    gap?: string | number;
    padding?: string | number;
    margin?: string | number;
    alignsX?: string;
    alignsY?: string;
    inset?: string;
    insetX?: string;
    insetY?: string;
};
export declare const flexLineResetStyles: (prefix: string) => CSSStyleSheet;
export declare const flexLineStyles: (prefix: string, direction: "row" | "column") => CSSStyleSheet;
export declare const stackBelowStyles: (prefix: string) => CSSStyleSheet;
export declare const flexLineVars: (props: FlexLinePropsT, prefix: string, direction: "row" | "column") => Record<string, string>;
