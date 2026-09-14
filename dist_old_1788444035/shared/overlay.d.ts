export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Align = 'start' | 'center' | 'end';
export type Placement = Side | `${Side}-${Align}`;
/**
 * A positionable thing that isn't a real DOM element — a selection Range's
 * rect, a table cell's last-known bounds, etc. Anywhere an Element is accepted
 * below, a VirtualAnchorT works too, since only getBoundingClientRect is used.
 */
export interface VirtualAnchorT {
    getBoundingClientRect(): DOMRect;
}
export type AnchorT = Element | VirtualAnchorT;
/** Wrap a plain {x,y,width,height} (e.g. from Selection.getRangeAt(0).getBoundingClientRect())
 *  as a VirtualAnchorT so it can be passed straight into computePosition/autoUpdate. */
export declare const rectAnchor: (rect: {
    x: number;
    y: number;
    width: number;
    height: number;
}) => VirtualAnchorT;
/**
 * Atomico's `{ type: Object }` prop validator requires the value's internal
 * tag to be the literal `[object Object]` (see atomico/src/element/set-prototype.js
 * filterValue) — it throws for anything else, including DOMRect instances and
 * functions. anchorRect props across the text-editor family are routinely set
 * from `Element.getBoundingClientRect()`/`Range.getBoundingClientRect()`
 * (a DOMRect), and z-mention-popover's `source` prop holds a function, so
 * neither can use `{ type: Object }`. Use this (Atomico's own `Any`/no-op
 * validator, `null`) for any prop that must accept an arbitrary value as-is.
 */
export declare const AnyProp: null;
export interface PositionOptions {
    placement?: Placement;
    /** gap in px between the anchor edge and the floating element */
    offset?: number;
    /** min distance in px the floating element keeps from the viewport edges */
    padding?: number;
}
export interface PositionResult {
    x: number;
    y: number;
    side: Side;
    placement: Placement;
}
export declare const computePosition: (anchor: AnchorT, floating: HTMLElement, opts?: PositionOptions) => PositionResult;
/**
 * Keep `update` in sync while the overlay is open: reposition on scroll
 * (capture, so nested scrollers count), resize, and any size change of the
 * anchor or floating element. Returns a teardown to call when it closes.
 */
export declare const autoUpdate: (anchor: AnchorT, floating: HTMLElement, update: () => void) => (() => void);
/**
 * Guarded Popover API toggles — showPopover/hidePopover throw if the element is
 * already in the requested state, so every caller would need the same matches()
 * check. Centralize it here.
 */
export declare const showFloating: (el: HTMLElement) => void;
export declare const hideFloating: (el: HTMLElement) => void;
/** Apply a PositionResult to a fixed-positioned floating element. */
export declare const applyPosition: (floating: HTMLElement, pos: PositionResult) => void;
/**
 * Point an arrow at the anchor's centre along whichever edge the panel ended
 * up on. Writes `--arrow-x` / `--arrow-y` in the floating element's own
 * coordinates; the component's CSS reads whichever one its current side uses,
 * so the two never have to agree about which axis is live.
 *
 * The result stops `arrowSize` short of both ends, because a panel that has
 * been shifted along its cross axis can leave the anchor's centre outside the
 * panel entirely — unclamped, the arrow walks off the corner.
 */
export declare const applyArrowPosition: (floating: HTMLElement, anchor: AnchorT, position: PositionResult, arrowSize: number) => void;
/** Shared prop surface for anchored overlays (placement / offset / accent). */
export declare const overlayPositionProps: {
    placement: {
        type: StringConstructor;
        reflect: boolean;
    };
    offset: {
        type: NumberConstructor;
    };
    accent: {
        type: StringConstructor;
        reflect: boolean;
    };
    isHidden: {
        type: BooleanConstructor;
        reflect: boolean;
    };
};
