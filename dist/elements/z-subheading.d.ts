export declare const ZSubheading: import("atomico/types/dom").Atomico<{
    props: {
        size: {
            type: import("atomico").CustomType<"xl" | "lg" | "md" | "sm" | "xs">;
            reflect: boolean;
        };
        color: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "muted" | "strong">;
            reflect: boolean;
        };
        weight: {
            type: NumberConstructor;
            reflect: boolean;
        };
        tag: StringConstructor;
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isItalic: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isUnderlined: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isStrikethrough: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
