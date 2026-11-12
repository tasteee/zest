export declare const ZSwap: import("atomico/types/dom").Atomico<{
    props: {
        kind: {
            type: import("atomico").CustomType<"stack" | "beside">;
            reflect: boolean;
        };
        effect: {
            type: StringConstructor;
            reflect: boolean;
        };
        hasGhost: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isActive: {
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
        label: StringConstructor;
        change: import("atomico").EventProp<{
            active: boolean;
        }>;
    };
    styles: import("atomico").Sheet;
}>;
