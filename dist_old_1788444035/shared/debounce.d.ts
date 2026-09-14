export declare const debounce: <ArgsT extends unknown[]>(fn: (...args: ArgsT) => void, waitMs: number) => {
    (...args: ArgsT): void;
    cancel(): void;
};
