/**
 * Shared flex layout rules, used by <z-box> (and, via the box props +
 * this stylesheet, its thin z-row/z-column wrappers). `aligns-x`/`aligns-y`
 * are resolved in JS (see box-schema.ts's getBoxHostStyle) into the
 * --z-box-justify/--z-box-align custom properties consumed below.
 */
export declare const boxLayoutStyles: CSSStyleSheet;
