export declare const ZAlertDialog: import("atomico/types/dom").Atomico<{
    props: {
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        heading: StringConstructor;
        description: StringConstructor;
        confirmLabel: StringConstructor;
        cancelLabel: StringConstructor;
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "danger">;
            reflect: boolean;
        };
        confirm: import("atomico").EventProp<void>;
        cancel: import("atomico").EventProp<void>;
    };
    styles: import("atomico").Sheet[];
}>;
