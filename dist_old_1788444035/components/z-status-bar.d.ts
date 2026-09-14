export declare const ZStatusBar: import("atomico/types/dom").Atomico<{
    props: {
        text: {
            type: StringConstructor;
        };
        cursorLine: {
            type: NumberConstructor;
        };
        cursorColumn: {
            type: NumberConstructor;
        };
        saveState: {
            type: StringConstructor;
            reflect: boolean;
        };
        wordsPerMinute: {
            type: NumberConstructor;
        };
    };
    styles: CSSStyleSheet;
}>;
