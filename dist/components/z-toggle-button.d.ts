export declare const ZToggleButton: import("atomico/types/dom").Atomico<{
    props: {
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm" | "xs">;
            reflect: boolean;
        };
        kind: {
            type: import("atomico").CustomType<"outline" | "solid" | "soft" | "ghost" | "plain">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "neutral">;
            reflect: boolean;
        };
        isIcon: {
            type: BooleanConstructor;
            reflect: boolean;
        };
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
        press: import("atomico").EventProp<{
            pressed: boolean;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
