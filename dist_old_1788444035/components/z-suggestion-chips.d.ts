export declare const ZSuggestionChips: import("atomico/types/dom").Atomico<{
    props: {
        suggestions: {
            type: ArrayConstructor;
        };
        doesShowArrow: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            value: string;
            label: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
