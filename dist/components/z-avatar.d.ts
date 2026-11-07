export declare const ZAvatar: import("atomico/types/dom").Atomico<{
    props: {
        src: StringConstructor;
        name: StringConstructor;
        initials: StringConstructor;
        status: {
            type: import("atomico").CustomType<"offline" | "online" | "busy" | "away">;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"xl" | "lg" | "md" | "sm" | "xs">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        isSquare: {
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
