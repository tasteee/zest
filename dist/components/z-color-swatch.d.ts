export declare const ZColorSwatch: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        isRound: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isValueHidden: {
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
