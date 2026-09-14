export declare const ZEditorCanvas: import("atomico/types/dom").Atomico<{
    props: {
        zoom: {
            type: NumberConstructor;
            reflect: boolean;
        };
        panX: {
            type: NumberConstructor;
            reflect: boolean;
        };
        panY: {
            type: NumberConstructor;
            reflect: boolean;
        };
        minZoom: {
            type: NumberConstructor;
            reflect: boolean;
        };
        maxZoom: {
            type: NumberConstructor;
            reflect: boolean;
        };
        zoomSpeed: {
            type: NumberConstructor;
            reflect: boolean;
        };
        grid: {
            type: StringConstructor;
            reflect: boolean;
        };
        gridSize: {
            type: NumberConstructor;
            reflect: boolean;
        };
        panButton: {
            type: StringConstructor;
            reflect: boolean;
        };
        wheel: {
            type: StringConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        viewportchange: import("atomico").EventProp<{
            x: number;
            y: number;
            zoom: number;
        }>;
        zoomchange: import("atomico").EventProp<{
            zoom: number;
        }>;
        panchange: import("atomico").EventProp<{
            x: number;
            y: number;
        }>;
    };
    styles: CSSStyleSheet;
}>;
export declare const ZCanvasItem: import("atomico/types/dom").Atomico<{
    props: {
        x: {
            type: NumberConstructor;
            reflect: boolean;
        };
        y: {
            type: NumberConstructor;
            reflect: boolean;
        };
        width: {
            type: NumberConstructor;
            reflect: boolean;
        };
        height: {
            type: NumberConstructor;
            reflect: boolean;
        };
        rotation: {
            type: NumberConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet;
}>;
