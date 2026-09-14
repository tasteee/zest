export declare const ZToggleGroup: import("atomico/types/dom").Atomico<{
    props: {
        direction: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            value?: string | string[];
        }>;
        accent: {
            readonly type: StringConstructor;
            readonly reflect: true;
        };
        size: {
            readonly type: StringConstructor;
            readonly reflect: true;
        };
        kind: {
            readonly type: StringConstructor;
            readonly reflect: true;
        };
        isIcon: {
            readonly type: BooleanConstructor;
            readonly reflect: true;
        };
    };
    styles: CSSStyleSheet;
}>;
