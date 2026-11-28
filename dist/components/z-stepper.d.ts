import './z-step';
export declare const ZStepper: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: NumberConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        size: {
            type: import("atomico").CustomType<"md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success">;
            reflect: boolean;
        };
        isVertical: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isNavigable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            value: number;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
