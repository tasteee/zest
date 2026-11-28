type RowT = Record<string, unknown> & {
    id?: string | number;
};
export declare const ZTable: import("atomico/types/dom").Atomico<{
    props: {
        columns: {
            type: ArrayConstructor;
        };
        rows: {
            type: ArrayConstructor;
        };
        emptyLabel: StringConstructor;
        isStriped: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isClickable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        rowclick: import("atomico").EventProp<{
            row: RowT;
            index: number;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
export {};
