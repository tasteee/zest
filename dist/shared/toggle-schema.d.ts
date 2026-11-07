export declare const toggleVariantProps: {
    readonly tone: {
        readonly type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
        readonly reflect: true;
    };
    readonly size: {
        readonly type: import("atomico").CustomType<"lg" | "md" | "sm" | "xs">;
        readonly reflect: true;
    };
    readonly kind: {
        readonly type: import("atomico").CustomType<"outline" | "solid" | "soft" | "ghost" | "plain">;
        readonly reflect: true;
    };
    readonly isIcon: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
};
type ToggleVariantPropsT = {
    tone?: string;
    size?: string;
    kind?: string;
    isIcon?: boolean;
};
export declare const resolveOwnToggleAccentClass: (props: ToggleVariantPropsT) => string | undefined;
export declare const resolveOwnToggleSizeClass: (props: ToggleVariantPropsT) => string | undefined;
export declare const resolveOwnToggleKindClass: (props: ToggleVariantPropsT) => string | undefined;
export declare const resolveToggleButtonClass: (props: ToggleVariantPropsT) => string;
export {};
