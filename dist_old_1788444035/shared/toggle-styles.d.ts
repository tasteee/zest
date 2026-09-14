/**
 * Every visual value is parked behind a --z-toggle-* custom property with a
 * literal default fallback (ghost + neutral + medium, matching the original
 * z-toggle.css defaults). A <z-toggle-group> can set these same properties on
 * its own :host; since they pierce the slot boundary via normal CSS custom
 * property inheritance, a <z-toggle-group-item> that doesn't declare its own
 * .is-* override class inherits the group's resolved variant for free. Nested
 * var() references (e.g. --z-toggle-hover-bg using var(--z-toggle-accent))
 * re-resolve against whichever element finally consumes them, so an item can
 * override just the color while inheriting kind from the group, or vice versa.
 */
export declare const toggleStyles: CSSStyleSheet;
