export declare const ZDraggable: import("atomico/types/dom").Atomico<{
    props: {
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        data: {
            type: ObjectConstructor;
        };
        group: {
            type: StringConstructor;
            reflect: boolean;
        };
        handle: {
            type: StringConstructor;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        dragstart: import("atomico").EventProp<{
            type: string;
            data: unknown;
        }>;
        dragmove: import("atomico").EventProp<{
            x: number;
            y: number;
            over: Element | null;
        }>;
        dragend: import("atomico").EventProp<{
            dropped: boolean;
            target: Element | null;
        }>;
    };
    styles: CSSStyleSheet;
}>;
export declare const ZDropTarget: import("atomico/types/dom").Atomico<{
    props: {
        accept: {
            type: StringConstructor;
            reflect: boolean;
        };
        group: {
            type: StringConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        dragenter: import("atomico").EventProp<unknown>;
        dragover: import("atomico").EventProp<unknown>;
        dragleave: import("atomico").EventProp<unknown>;
        dropitem: import("atomico").EventProp<{
            data: unknown;
            type: string;
            source: Element;
            x: number;
            y: number;
        }>;
    };
    styles: CSSStyleSheet;
}>;
