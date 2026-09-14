export declare const ZMenu: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        align: {
            type: StringConstructor;
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
        select: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
