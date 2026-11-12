export declare const ZAlert: import("atomico/types/dom").Atomico<{
    props: {
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        heading: StringConstructor;
        isDismissable: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        dismiss: import("atomico").EventProp<void>;
    };
    styles: import("atomico").Sheet[];
}>;
