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
    styles: import("atomico").Sheet;
}>;
