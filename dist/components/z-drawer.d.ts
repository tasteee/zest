export declare const ZDrawer: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        heading: StringConstructor;
        description: StringConstructor;
        isStatic: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        open: import("atomico").EventProp<void>;
        close: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
