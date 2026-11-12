export declare const ZMarkdown: import("atomico/types/dom").Atomico<{
    props: {
        content: {
            type: StringConstructor;
        };
        isStreaming: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        doesAllowHtml: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isPlain: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        hasHeadingAnchors: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        linkclick: import("atomico").EventProp<{
            href: string;
        }>;
    };
    styles: import("atomico").Sheet;
}>;
