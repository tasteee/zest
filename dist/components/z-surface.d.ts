export declare const ZSurface: import("atomico/types/dom").Atomico<{
    props: {
        inset: StringConstructor;
        insetX: StringConstructor;
        insetY: StringConstructor;
        level: {
            type: import("atomico").CustomType<"0" | "1" | "2" | "3">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        kind: {
            type: import("atomico").CustomType<"outline" | "solid" | "soft" | "ghost" | "plain">;
            reflect: boolean;
        };
        radius: StringConstructor;
        isBordered: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isElevated: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isInteractive: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
}>;
