export declare const ZStep: import("atomico/types/dom").Atomico<{
    props: {
        label: StringConstructor;
        description: StringConstructor;
        state: {
            type: import("atomico").CustomType<"current" | "complete" | "upcoming">;
            reflect: boolean;
        };
        index: {
            type: NumberConstructor;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"md" | "sm">;
            reflect: boolean;
        };
        isError: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isOptional: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isNavigable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isVertical: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isLast: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            index: number;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
