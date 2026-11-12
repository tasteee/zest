export declare const ZMarquee: import("atomico/types/dom").Atomico<{
    props: {
        duration: NumberConstructor;
        gap: {
            readonly type: StringConstructor;
        };
        isReversed: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        direction: {
            type: import("atomico").CustomType<"horizontal" | "vertical">;
            reflect: boolean;
        };
        doesPauseOnHover: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        hasFade: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
