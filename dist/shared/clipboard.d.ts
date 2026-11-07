export type CopyResultT = {
    isCopied: boolean;
    error: Error | null;
};
export declare const checkIsClipboardAvailable: () => boolean;
export declare const copyText: (text: string) => Promise<CopyResultT>;
export declare const COPY_FEEDBACK_DURATION = 1600;
