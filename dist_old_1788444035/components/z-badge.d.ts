export declare const ZBadge: import("atomico/types/dom").Atomico<{
    props: {
        accent: {
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
        label: StringConstructor;
        value: StringConstructor;
        isDot: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        selectable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isSelected: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        removable: {
            type: BooleanConstructor;
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
        select: import("atomico").EventProp<{
            value?: string;
            selected: boolean;
        }>;
        remove: import("atomico").EventProp<{
            value?: string;
        }>;
    };
    styles: CSSStyleSheet;
}>;
