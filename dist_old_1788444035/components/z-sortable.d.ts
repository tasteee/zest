export declare const ZSortable: import("atomico/types/dom").Atomico<{
    props: {
        axis: {
            type: StringConstructor;
            reflect: boolean;
        };
        handle: {
            type: StringConstructor;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        start: import("atomico").EventProp<{
            index: number;
        }>;
        sort: import("atomico").EventProp<{
            oldIndex: number;
            newIndex: number;
        }>;
        end: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet;
}>;
