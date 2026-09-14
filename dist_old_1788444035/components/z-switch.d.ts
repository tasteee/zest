export declare const ZSwitch: import("atomico/types/dom").Atomico<{
    props: {
        isChecked: {
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
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        name: StringConstructor;
        value: StringConstructor;
        change: import("atomico").EventProp<{
            checked: boolean;
            value?: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
