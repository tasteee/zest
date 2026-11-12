export declare const ZPagination: import("atomico/types/dom").Atomico<{
    props: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        page: {
            type: NumberConstructor;
            reflect: boolean;
        };
        total: {
            type: NumberConstructor;
            reflect: boolean;
        };
        siblingCount: {
            type: NumberConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            page: number;
        }>;
    };
    styles: CSSStyleSheet;
}>;
