export type RangeHandleT = {
    label?: string;
    tone?: string;
    min?: number;
    max?: number;
    step?: number;
};
export type RangeValueT = [number, number];
type RangeDetailT = {
    value: RangeValueT;
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
        value: {
            type: ArrayConstructor;
        };
        handles: {
            type: ArrayConstructor;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        doesShowValue: {
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
    styles: CSSStyleSheet[];
    form: true;
}>;
export {};
