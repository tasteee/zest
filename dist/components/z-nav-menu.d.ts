export declare const ZNavMenu: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        value: {
            type: StringConstructor;
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
        select: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
