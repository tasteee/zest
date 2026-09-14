export declare const ZSheet: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        side: {
            type: StringConstructor;
            reflect: boolean;
        };
        heading: StringConstructor;
        description: StringConstructor;
        hasClose: {
            type: BooleanConstructor;
            reflect: boolean;
            value: () => true;
        };
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
