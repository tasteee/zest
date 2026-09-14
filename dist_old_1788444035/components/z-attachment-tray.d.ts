export declare const ZAttachmentTray: import("atomico/types/dom").Atomico<{
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
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        files: import("atomico").EventProp<{
            files: File[];
        }>;
        reject: import("atomico").EventProp<{
            files: File[];
            reason?: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
