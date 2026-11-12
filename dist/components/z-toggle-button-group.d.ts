export declare const ZToggleButtonGroup: import("atomico/types/dom").Atomico<{
    props: {
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        direction: {
            type: import("atomico").CustomType<"horizontal" | "vertical">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isMultiple: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            value?: string | string[];
        }>;
        tone: {
            readonly type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            readonly reflect: true;
        };
        size: {
            readonly type: import("atomico").CustomType<"lg" | "md" | "sm" | "xs">;
            readonly reflect: true;
        };
        kind: {
            readonly type: import("atomico").CustomType<"outline" | "solid" | "soft" | "ghost" | "plain">;
            readonly reflect: true;
        };
        isIcon: {
            readonly type: BooleanConstructor;
            readonly reflect: true;
        };
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
