export declare const ZRadioGroup: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        direction: {
            type: StringConstructor;
            reflect: boolean;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            value?: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
