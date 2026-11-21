export declare const ZTimelineItem: import("atomico/types/dom").Atomico<{
    props: {
        heading: StringConstructor;
        description: StringConstructor;
        time: StringConstructor;
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary" | "success" | "warning" | "danger">;
            reflect: boolean;
        };
        isPending: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet[];
}>;
