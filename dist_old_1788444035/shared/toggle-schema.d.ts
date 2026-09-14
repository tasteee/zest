export declare const toggleVariantProps: {
    readonly accent: {
        readonly type: StringConstructor;
        readonly reflect: true;
    };
    readonly size: {
        readonly type: StringConstructor;
        readonly reflect: true;
    };
    readonly kind: {
        readonly type: StringConstructor;
        readonly reflect: true;
    };
    readonly isIcon: {
        readonly type: BooleanConstructor;
        readonly reflect: true;
    };
};
type ToggleVariantPropsT = {
    accent?: string;
    size?: string;
    kind?: string;
    isIcon?: boolean;
};
export declare const resolveOwnToggleAccentClass: (props: ToggleVariantPropsT) => string | undefined;
export declare const resolveOwnToggleSizeClass: (props: ToggleVariantPropsT) => string | undefined;
export declare const resolveOwnToggleKindClass: (props: ToggleVariantPropsT) => string | undefined;
export declare const resolveToggleButtonClass: (props: ToggleVariantPropsT) => string;
export {};
