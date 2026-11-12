export type ToastToneT = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type ToastOptionsT = {
    id?: string;
    title?: string;
    description?: string;
    tone?: ToastToneT;
    /** ms until it hides itself; Infinity or 0 keeps it up until hidden */
    duration?: number;
};
export type ToastT = {
    id: string;
    title?: string;
    description?: string;
    tone: ToastToneT;
    duration: number;
    /** bumped on every show() of this id, restarts the countdown ring */
    version: number;
    state: 'open' | 'closing';
};
export type HideToastT = (() => void) & {
    id: string;
};
export declare const toaster: {
    show: (input: string | ToastOptionsT) => HideToastT;
    hide: (target: string | {
        id: string;
    }) => void;
    clear: () => void;
    /** current toasts, oldest first (read-only snapshot) */
    readonly toasts: readonly ToastT[];
};
export declare const ZToaster: import("atomico/types/dom").Atomico<{
    props: {
        position: {
            type: import("atomico").CustomType<"bottom-end" | "bottom-center" | "bottom-start" | "top-end" | "top-center" | "top-start">;
            reflect: boolean;
        };
    };
    styles: import("atomico").Sheet;
}>;
