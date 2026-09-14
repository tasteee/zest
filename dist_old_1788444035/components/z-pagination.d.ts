export declare const ZPagination: import("atomico/types/dom").Atomico<{
    props: {
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
        accent: {
            type: StringConstructor;
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
