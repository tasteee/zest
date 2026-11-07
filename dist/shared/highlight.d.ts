export type Token = {
    className: string;
    value: string;
};
export declare const canHighlight: (language: string) => boolean;
export declare const highlight: (code: string, language?: string) => Token[];
export declare const splitTokenLines: (tokens: Token[]) => Token[][];
