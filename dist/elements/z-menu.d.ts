export declare const ZMenu: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        align: {
            type: import("atomico").CustomType<"end" | "start">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: import("atomico").Sheet[];
}>;
/** z-menu-separator, a hairline between declarative z-menu-item groups. */
/**
 * z-menu-label, a non-focusable section heading. The rows after it, up to the
 * next label or separator, form a group named by this text.
 */
