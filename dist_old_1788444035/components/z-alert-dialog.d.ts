export declare const ZAlertDialog: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        heading: StringConstructor;
        description: StringConstructor;
        confirmLabel: StringConstructor;
        cancelLabel: StringConstructor;
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        confirm: import("atomico").EventProp<void>;
        cancel: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
