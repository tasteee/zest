export declare const ZCollapsible: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        toggle: import("atomico").EventProp<{
            value: string;
            open: boolean;
        }>;
    };
    styles: CSSStyleSheet;
}>;
