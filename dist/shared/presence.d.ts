/** Longest `duration + delay` across the element's current transitions, in ms. */
export declare const transitionMs: (el: Element) => number;
export declare const cancelExit: (el: Element) => void;
export declare const isExiting: (el: HTMLElement) => boolean;
export declare const runExit: (el: HTMLElement, finish: () => void) => void;
/** Flip el into its open state from the hidden one, committing the hidden
 *  styles first so the browser has something to transition from. */
export declare const runEnter: (el: HTMLElement) => void;
