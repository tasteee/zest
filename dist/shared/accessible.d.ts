export declare const DESCRIPTION_ID = "z-description";
export declare const ERROR_ID = "z-error";
export declare const srOnlyStyles: CSSStyleSheet;
export declare const resolveAccessibleName: (host: HTMLElement, label?: string) => string | undefined;
/**
 * The accessible name for the inner control, kept current when the host's
 * aria-label / aria-labelledby change after mount (a framework re-render, a
 * translated label) — Atomico only re-renders on prop changes, so the
 * attributes are watched explicitly.
 */
export declare const useAccessibleName: (label?: string) => string | undefined;
/** The `aria-describedby` value for a control with the given description/error text, or undefined. */
export declare const describedBy: (description?: string, error?: string) => string | undefined;
/** The visually hidden nodes `describedBy` points at. Render inside the shadow root next to the control. */
export declare const renderDescriptions: (description?: string, error?: string) => any;
/** The props every describable control declares. */
export declare const describableProps: {
    readonly description: StringConstructor;
    readonly error: StringConstructor;
};
