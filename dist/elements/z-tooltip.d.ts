export declare const ZTooltip: import("atomico/types/dom").Atomico<{
    props: {
        content: StringConstructor;
        openDelay: {
            type: NumberConstructor;
        };
        doesHideArrow: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        placement: {
            type: import("atomico").CustomType<"bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-center" | "bottom-start" | "left-end" | "left-center" | "left-start" | "right-end" | "right-center" | "right-start" | "top-end" | "top-center" | "top-start">;
            reflect: boolean;
        };
        offset: {
            type: NumberConstructor;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet[];
}>;
