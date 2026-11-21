import type { LanguageFn } from 'highlight.js';
/**
 * Adds a highlight.js grammar to z-code-block, plus any extra names it should
 * answer to. The core build ships nine grammars; everything else is opt-in:
 *
 *   import python from 'highlight.js/lib/languages/python'
 *   registerLanguage('python', python, ['py'])
 *
 * Or import '@tasteee/zest/languages' to register a ready-made set.
 */
export declare const registerLanguage: (name: string, grammar: LanguageFn, aliases?: string[]) => void;
export type Token = {
    className: string;
    value: string;
};
export declare const canHighlight: (language: string) => boolean;
export declare const highlight: (code: string, language?: string) => Token[];
export declare const splitTokenLines: (tokens: Token[]) => Token[][];
