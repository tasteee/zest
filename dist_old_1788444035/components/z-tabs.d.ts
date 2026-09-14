export declare const ZTabs: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        tabs: {
            type: ArrayConstructor;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isFitted: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
