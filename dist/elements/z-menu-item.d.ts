export declare const ZMenuItem: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        shortcut: {
            type: StringConstructor;
            reflect: boolean;
        };
        description: {
            type: StringConstructor;
            reflect: boolean;
        };
        type: {
            type: import("atomico").CustomType<"action" | "radio" | "checkbox">;
            reflect: boolean;
        };
        isChecked: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDanger: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
/** z-menu-separator, a hairline between declarative z-menu-item groups. */
/**
 * z-menu-label, a non-focusable section heading. The rows after it, up to the
 * next label or separator, form a group named by this text.
 */
