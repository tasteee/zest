export declare const ZDockItem: import("atomico/types/dom").Atomico<{
    props: {
        label: StringConstructor;
        href: StringConstructor;
        isActive: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<null>;
    };
    styles: CSSStyleSheet;
}>;
