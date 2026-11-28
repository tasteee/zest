export declare const ZEyebrow: import("atomico/types/dom").Atomico<{
    props: {
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        label: StringConstructor;
        hasRule: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullWidth: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
