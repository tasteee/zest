export declare const ZSheet: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        side: {
            type: import("atomico").CustomType<"bottom" | "left" | "right" | "top">;
            reflect: boolean;
        };
        heading: StringConstructor;
        description: StringConstructor;
        isCloseHidden: {
            type: BooleanConstructor;
            reflect: boolean;
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
