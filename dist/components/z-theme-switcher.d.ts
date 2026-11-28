import type { ThemePreferenceT, ThemeT } from '../shared/theme';
export declare const ZThemeSwitcher: import("atomico/types/dom").Atomico<{
    props: {
        kind: {
            type: import("atomico").CustomType<"icon" | "segmented">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
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
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
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
