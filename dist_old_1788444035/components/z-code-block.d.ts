import './z-copy-button';
export declare const ZCodeBlock: import("atomico/types/dom").Atomico<{
    props: {
        code: StringConstructor;
        language: StringConstructor;
        filename: StringConstructor;
        label: StringConstructor;
        lineNumbers: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        highlight: {
            type: BooleanConstructor;
            reflect: boolean;
            value: () => true;
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
        hasCopy: {
            type: BooleanConstructor;
            reflect: boolean;
            value: () => true;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        copy: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
