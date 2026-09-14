export declare const ZFilter: import("atomico/types/dom").Atomico<{
    props: {
        options: {
            type: ArrayConstructor;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        resetLabel: StringConstructor;
        isDrilldown: {
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
        change: import("atomico").EventProp<{
            value?: string;
            path: string[];
        }>;
    };
    styles: CSSStyleSheet;
}>;
