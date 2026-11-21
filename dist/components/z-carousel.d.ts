export declare const ZCarousel: import("atomico/types/dom").Atomico<{
    props: {
        autoplay: {
            type: NumberConstructor;
        };
        doesLoop: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            index: number;
        }>;
    };
    styles: CSSStyleSheet;
}>;
