export declare const ZSlider: import("atomico/types/dom").Atomico<{
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
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        doesShowValue: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        canReset: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        valuePrefix: StringConstructor;
        valueSuffix: StringConstructor;
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
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
    styles: import("atomico").Sheet[];
    form: true;
}>;
