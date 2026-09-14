export declare const ZCarousel: import("atomico/types/dom").Atomico<{
    props: {
        autoplay: {
            type: NumberConstructor;
        };
        doesLoop: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        accent: {
            type: StringConstructor;
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
