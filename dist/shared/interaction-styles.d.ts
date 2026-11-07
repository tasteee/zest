/**
 * Shared accessibility overrides, included inside each core shadow root.
 *
 * Reduced motion: an instant change, not a slower one. Every animation and
 * transition in the shadow root collapses to a hair over zero, which keeps
 * `transitionend` firing for the code that waits on it.
 *
 * Forced colors (Windows High Contrast): the platform repaints colours for
 * us, and takes away the ones a state depended on. Three things need saying
 * explicitly — that a selected / checked / active thing is the system
 * Highlight, that a disabled thing is GrayText, and that focus is a solid
 * system-coloured outline rather than a translucent ring. The class and
 * ARIA hooks below are the ones the core set uses for those states.
 */
export declare const interactionStyles: CSSStyleSheet;
