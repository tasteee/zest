export declare const ZContextMenu: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: import("atomico").Sheet;
}>;
