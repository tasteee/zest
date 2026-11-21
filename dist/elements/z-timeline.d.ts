export declare const ZTimeline: import("atomico/types/dom").Atomico<{
    props: {
        label: StringConstructor;
        size: {
            type: import("atomico").CustomType<"md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet[];
}>;
