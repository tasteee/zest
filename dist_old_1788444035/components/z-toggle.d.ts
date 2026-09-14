export declare const ZToggle: import("atomico/types/dom").Atomico<{
    props: {
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        kind: {
            type: StringConstructor;
            reflect: boolean;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isIcon: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isPressed: {
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
        press: import("atomico").EventProp<{
            pressed: boolean;
        }>;
    };
    styles: CSSStyleSheet;
}>;
