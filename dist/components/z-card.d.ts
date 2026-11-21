export declare const ZCard: import("atomico/types/dom").Atomico<{
    props: {
        heading: StringConstructor;
        description: StringConstructor;
        gap: {
            readonly type: StringConstructor;
        };
        isHorizontal: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        /** @deprecated use is-horizontal */
        direction: {
            type: import("atomico").CustomType<"horizontal" | "vertical">;
            reflect: boolean;
        };
        isReactive: {
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
