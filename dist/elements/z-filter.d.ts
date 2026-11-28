export declare const ZFilter: import("atomico/types/dom").Atomico<{
    props: {
        options: {
            type: ArrayConstructor;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        label: StringConstructor;
        resetLabel: StringConstructor;
        isDrilldown: {
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
        change: import("atomico").EventProp<{
            value?: string;
            path: string[];
        }>;
    };
    styles: import("atomico").Sheet;
    form: true;
}>;
