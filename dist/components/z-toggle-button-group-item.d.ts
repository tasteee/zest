export declare const ZToggleButtonGroupItem: import("atomico/types/dom").Atomico<{
    props: {
        isPressed: {
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
        value: StringConstructor;
        press: import("atomico").EventProp<{
            pressed: boolean;
            value?: string;
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
    styles: CSSStyleSheet;
}>;
