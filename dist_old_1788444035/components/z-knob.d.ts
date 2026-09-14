export declare const ZKnob: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: NumberConstructor;
            reflect: boolean;
        };
        min: {
            type: NumberConstructor;
            reflect: boolean;
        };
        max: {
            type: NumberConstructor;
            reflect: boolean;
        };
        step: {
            type: NumberConstructor;
            reflect: boolean;
        };
        defaultValue: {
            type: NumberConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        doesShowValue: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        valuePrefix: StringConstructor;
        valueSuffix: StringConstructor;
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isGlowing: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
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
        input: import("atomico").EventProp<{
            value: number;
        }>;
        change: import("atomico").EventProp<{
            value: number;
        }>;
    };
    styles: CSSStyleSheet;
}>;
