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
    styles: import("atomico").Sheet;
}>;
