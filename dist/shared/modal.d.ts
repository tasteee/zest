/** Show the dialog modally and transition it in. Returns true when it actually opened. */
export declare const openModal: (dialog: HTMLDialogElement) => boolean;
/** Transition the dialog out, then close() it once the exit has finished. */
export declare const closeModal: (dialog: HTMLDialogElement, onClosed?: () => void) => void;
/**
 * Route Esc through the animated close: the native `cancel` event would
 * otherwise close the dialog immediately. Attach as the dialog's oncancel.
 */
export declare const interceptCancel: (e: Event, requestClose: () => void) => void;
