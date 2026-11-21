export declare const ZMenu: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        align: {
            type: import("atomico").CustomType<"end" | "start">;
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
        select: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
export declare const ZMenuItem: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        shortcut: {
            type: StringConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDanger: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet;
}>;
/** z-menu-separator, a hairline between declarative z-menu-item groups. */
export declare const ZMenuSeparator: import("atomico/types/dom").Atomico<{
    props: {};
}>;
