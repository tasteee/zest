export declare const ZSelectionToolbar: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        anchorRect: null;
        placement: {
            type: StringConstructor;
            reflect: boolean;
        };
        offset: {
            type: NumberConstructor;
        };
        label: StringConstructor;
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        action: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
