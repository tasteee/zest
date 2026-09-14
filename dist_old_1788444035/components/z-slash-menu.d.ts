export declare const ZSlashMenu: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        query: {
            type: StringConstructor;
        };
        anchorRect: null;
        placement: {
            type: StringConstructor;
            reflect: boolean;
        };
        offset: {
            type: NumberConstructor;
        };
        emptyText: StringConstructor;
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            value: string;
        }>;
        empty: import("atomico").EventProp<void>;
        dismiss: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
