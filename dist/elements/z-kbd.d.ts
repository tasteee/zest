export declare const ZKbd: import("atomico/types/dom").Atomico<{
    props: {
        size: {
            type: import("atomico").CustomType<"xl" | "lg" | "md" | "sm" | "xs">;
            reflect: boolean;
        };
        label: StringConstructor;
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
