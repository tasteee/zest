export declare const ZAlert: import("atomico/types/dom").Atomico<{
    props: {
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        heading: StringConstructor;
        isDismissable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        dismiss: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet;
}>;
