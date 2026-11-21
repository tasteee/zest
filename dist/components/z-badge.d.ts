export declare const ZBadge: import("atomico/types/dom").Atomico<{
    props: {
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        kind: {
            type: import("atomico").CustomType<"outline" | "solid" | "soft">;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"md" | "sm">;
            reflect: boolean;
        };
        label: StringConstructor;
        value: StringConstructor;
        isDot: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isSelectable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isSelected: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isRemovable: {
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
    styles: CSSStyleSheet[];
}>;
