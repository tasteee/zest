export declare const ZFormatToolbar: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        headingOptions: {
            type: ArrayConstructor;
        };
        headingValue: {
            type: StringConstructor;
            reflect: boolean;
        };
        headingPlaceholder: StringConstructor;
        label: StringConstructor;
        action: import("atomico").EventProp<{
            value: string;
        }>;
        headingchange: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
