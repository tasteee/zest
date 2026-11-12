export declare const ZCodeBlock: import("atomico/types/dom").Atomico<{
    props: {
        code: StringConstructor;
        files: {
            type: ArrayConstructor;
        };
        language: StringConstructor;
        filename: StringConstructor;
        hasLineNumbers: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isCopyHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFlush: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHeaderHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isPlain: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        addedLines: {
            type: StringConstructor;
            reflect: boolean;
        };
        removedLines: {
            type: StringConstructor;
            reflect: boolean;
        };
        focusLines: {
            type: StringConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        copy: import("atomico").EventProp<void>;
    };
    styles: import("atomico").Sheet[];
}>;
