export declare const ZLink: import("atomico/types/dom").Atomico<{
    props: {
        href: StringConstructor;
        target: StringConstructor;
        label: StringConstructor;
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        underline: {
            type: import("atomico").CustomType<"none" | "hover" | "always">;
            reflect: boolean;
        };
        isExternal: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullWidth: {
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
    };
    styles: CSSStyleSheet;
}>;
