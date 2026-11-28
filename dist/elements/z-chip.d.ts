export declare const ZChip: import("atomico/types/dom").Atomico<{
    props: {
        label: StringConstructor;
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        kind: {
            type: import("atomico").CustomType<"outline" | "soft">;
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
    styles: import("atomico").Sheet[];
}>;
