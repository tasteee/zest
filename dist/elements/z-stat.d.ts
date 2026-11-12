export declare const ZStat: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"xxl" | "xl" | "lg" | "md" | "sm" | "xs">;
            reflect: boolean;
        };
        labelSize: {
            type: import("atomico").CustomType<"xxl" | "xl" | "lg" | "md" | "sm" | "xs">;
            reflect: boolean;
        };
        color: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "muted" | "strong">;
            reflect: boolean;
        };
        align: {
            type: import("atomico").CustomType<"end" | "center" | "start">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
