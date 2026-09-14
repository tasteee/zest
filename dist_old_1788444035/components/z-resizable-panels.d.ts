export declare const ZResizablePanels: import("atomico/types/dom").Atomico<{
    props: {
        direction: {
            type: StringConstructor;
            reflect: boolean;
        };
        autoSaveId: {
            type: StringConstructor;
            reflect: boolean;
        };
        keyboardStep: {
            type: NumberConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        layout: import("atomico").EventProp<{
            sizes: number[];
        }>;
    };
    styles: CSSStyleSheet;
}>;
export declare const ZPanelHandle: import("atomico/types/dom").Atomico<{
    props: {
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        dragging: import("atomico").EventProp<{
            isDragging: boolean;
        }>;
    };
    styles: CSSStyleSheet;
}>;
