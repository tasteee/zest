export declare const ZCommand: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        items: {
            type: ArrayConstructor;
        };
        placeholder: StringConstructor;
        emptyText: StringConstructor;
        select: import("atomico").EventProp<{
            value: string;
        }>;
        open: import("atomico").EventProp<void>;
        close: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
export declare const ZCommandItem: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        group: {
            type: StringConstructor;
            reflect: boolean;
        };
        shortcut: {
            type: StringConstructor;
            reflect: boolean;
        };
        keywords: {
            type: StringConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet;
}>;
