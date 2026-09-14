export declare const ZCopyButton: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
        };
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        copiedLabel: {
            type: StringConstructor;
            reflect: boolean;
        };
        kind: {
            type: StringConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        copy: import("atomico").EventProp<{
            value: string;
        }>;
        error: import("atomico").EventProp<{
            error: Error | null;
        }>;
    };
    styles: CSSStyleSheet;
}>;
