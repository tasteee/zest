export declare const ZButton: import("atomico/types/dom").Atomico<{
    props: {
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
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
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isLoading: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        type: import("atomico").CustomType<"button" | "reset" | "submit">;
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        value: StringConstructor;
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
