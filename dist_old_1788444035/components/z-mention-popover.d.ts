export declare const ZMentionPopover: import("atomico/types/dom").Atomico<{
    props: {
        trigger: {
            type: StringConstructor;
            reflect: boolean;
        };
        items: {
            type: ArrayConstructor;
        };
        source: null;
        query: {
            type: StringConstructor;
        };
        debounceMs: {
            type: NumberConstructor;
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
            label: string;
        }>;
        empty: import("atomico").EventProp<void>;
        dismiss: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
