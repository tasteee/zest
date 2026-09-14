export declare const ZCommentMark: import("atomico/types/dom").Atomico<{
    props: {
        threadId: {
            type: StringConstructor;
            reflect: boolean;
        };
        isActive: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isResolved: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        activate: import("atomico").EventProp<{
            threadId: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
export declare const ZCommentGutterIcon: import("atomico/types/dom").Atomico<{
    props: {
        threadId: {
            type: StringConstructor;
            reflect: boolean;
        };
        anchorRect: null;
        count: {
            type: NumberConstructor;
        };
        isActive: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        open: import("atomico").EventProp<{
            threadId: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
export declare const ZCommentThreadPanel: import("atomico/types/dom").Atomico<{
    props: {
        threads: {
            type: ArrayConstructor;
        };
        activeThreadId: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            threadId: string;
        }>;
        reply: import("atomico").EventProp<{
            threadId: string;
            text: string;
        }>;
        resolve: import("atomico").EventProp<{
            threadId: string;
        }>;
        close: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet;
}>;
