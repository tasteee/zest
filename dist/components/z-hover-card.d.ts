export declare const ZHoverCard: import("atomico/types/dom").Atomico<{
    props: {
        openDelay: {
            type: NumberConstructor;
        };
        closeDelay: {
            type: NumberConstructor;
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
    styles: CSSStyleSheet[];
}>;
