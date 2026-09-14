export declare const ZTableToolbar: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        anchorRect: null;
        placement: {
            type: StringConstructor;
            reflect: boolean;
        };
        offset: {
            type: NumberConstructor;
        };
        label: StringConstructor;
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        action: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
export declare const ZTableAxisHandle: import("atomico/types/dom").Atomico<{
    props: {
        axis: {
            type: StringConstructor;
            reflect: boolean;
        };
        anchorRect: null;
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isSelected: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<void>;
        insertafter: import("atomico").EventProp<void>;
        remove: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
