import type { ThemePreferenceT, ThemeT } from '../shared/theme';
export declare const ZThemeSwitcher: import("atomico/types/dom").Atomico<{
    props: {
        kind: {
            type: StringConstructor;
            reflect: boolean;
        };
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        themes: {
            type: ArrayConstructor;
        };
        isIconOnly: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        change: import("atomico").EventProp<{
            preference: ThemePreferenceT;
            theme: ThemeT;
        }>;
    };
    styles: CSSStyleSheet;
}>;
