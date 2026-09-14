export declare const moveActiveIndex: (current: number, direction: number, itemCount: number, isSelectable: (index: number) => boolean) => number;
export type MenuNavOptionsT = {
    isOpen: boolean;
    itemCount: number;
    activeIndex: number;
    isSelectable: (index: number) => boolean;
    onOpen: () => void;
    onMove: (index: number) => void;
    onCommit: (index: number) => void;
    onClose: () => void;
};
/** Builds an onkeydown handler implementing the trap: ↑/↓ move (skipping
 *  non-selectable rows), Enter/Space commit, Escape releases the trap. */
export declare const createMenuKeyDownHandler: (options: MenuNavOptionsT) => (event: KeyboardEvent) => void;
export type LiveQueryMenuNavOptionsT = {
    itemCount: number;
    activeIndex: number;
    isSelectable: (index: number) => boolean;
    onMove: (index: number) => void;
    onCommit: (index: number) => void;
    onClose: () => void;
};
/** Keydown trap for menus driven by a live-typed query (z-slash-menu,
 *  z-mention-popover): unlike createMenuKeyDownHandler, Space is never a
 *  commit key here — it's an ordinary character the host document is still
 *  typing, so only ArrowUp/ArrowDown/Enter/Escape are intercepted. */
export declare const createLiveQueryMenuKeyDownHandler: (options: LiveQueryMenuNavOptionsT) => (event: KeyboardEvent) => void;
