export declare const ZDropzone: import("atomico/types/dom").Atomico<{
    props: {
        accept: {
            type: StringConstructor;
            reflect: boolean;
        };
        isMultiple: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        maxSize: {
            type: NumberConstructor;
            reflect: boolean;
        };
        maxFiles: {
            type: NumberConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        files: {
            type: ArrayConstructor;
        };
        drop: import("atomico").EventProp<{
            files: File[];
        }>;
        clear: import("atomico").EventProp<void>;
        reject: import("atomico").EventProp<{
            files: File[];
            reason: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
