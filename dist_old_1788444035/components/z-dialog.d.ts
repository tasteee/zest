export declare const ZDialog: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        heading: StringConstructor;
        description: StringConstructor;
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
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
