export declare const ZBreadcrumbs: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        max: {
            type: NumberConstructor;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        navigate: import("atomico").EventProp<{
            value: string;
            index: number;
        }>;
    };
    styles: CSSStyleSheet;
}>;
