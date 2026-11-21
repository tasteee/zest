export declare const ZRadio: import("atomico/types/dom").Atomico<{
    props: {
        isChecked: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        value: StringConstructor;
        label: StringConstructor;
        select: import("atomico").EventProp<{
            value?: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
