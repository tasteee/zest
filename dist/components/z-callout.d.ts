export declare const ZCallout: import("atomico/types/dom").Atomico<{
    props: {
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        heading: {
            type: StringConstructor;
            reflect: boolean;
        };
        isExpandable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isExpanded: {
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
