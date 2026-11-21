export declare const ZMeter: import("atomico/types/dom").Atomico<{
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
        low: {
            type: NumberConstructor;
            reflect: boolean;
        };
        high: {
            type: NumberConstructor;
            reflect: boolean;
        };
        optimum: {
            type: NumberConstructor;
            reflect: boolean;
        };
        segments: {
            type: NumberConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        valuePrefix: StringConstructor;
        valueSuffix: StringConstructor;
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        doesShowValue: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
