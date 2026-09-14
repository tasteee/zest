export declare const ZCommand: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        items: {
            type: ArrayConstructor;
        };
        placeholder: StringConstructor;
        emptyText: StringConstructor;
        select: import("atomico").EventProp<{
            value: string;
        }>;
        open: import("atomico").EventProp<void>;
        close: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
