export declare const ZToggleGroupItem: import("atomico/types/dom").Atomico<{
    props: {
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
        value: StringConstructor;
        press: import("atomico").EventProp<{
            pressed: boolean;
            value?: string;
        }>;
        accent: {
            readonly type: StringConstructor;
            readonly reflect: true;
        };
        size: {
            readonly type: StringConstructor;
            readonly reflect: true;
        };
        kind: {
            readonly type: StringConstructor;
            readonly reflect: true;
        };
        isIcon: {
            readonly type: BooleanConstructor;
            readonly reflect: true;
        };
    };
    styles: CSSStyleSheet;
}>;
