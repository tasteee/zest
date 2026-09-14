type RangeDetailT = {
    left: number;
    right: number;
};
export declare const ZRange: import("atomico/types/dom").Atomico<{
    props: {
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
        label: StringConstructor;
        showValue: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        valuePrefix: StringConstructor;
        valueSuffix: StringConstructor;
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        input: import("atomico").EventProp<RangeDetailT>;
        change: import("atomico").EventProp<RangeDetailT>;
    };
    styles: CSSStyleSheet;
}>;
export {};
