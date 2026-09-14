export declare const Theme: {
    readonly dark: "dark";
    readonly light: "light";
    readonly console: "console";
    readonly studio: "studio";
};
export type ThemeT = (typeof Theme)[keyof typeof Theme];
export declare const ThemePreference: {
    readonly system: "system";
    readonly dark: "dark";
    readonly light: "light";
    readonly console: "console";
    readonly studio: "studio";
};
export type ThemePreferenceT = (typeof ThemePreference)[keyof typeof ThemePreference];
export declare const ThemeScheme: {
    readonly dark: "dark";
    readonly light: "light";
};
export type ThemeSchemeT = (typeof ThemeScheme)[keyof typeof ThemeScheme];
export declare const getThemeScheme: (theme: ThemeT) => ThemeSchemeT;
export declare const getAllThemes: () => ThemeT[];
export type ThemeStateT = {
    preference: ThemePreferenceT;
    theme: ThemeT;
};
export type ThemeListenerT = (state: ThemeStateT) => void;
export declare const getSystemTheme: () => ThemeT;
export declare const resolveTheme: (preference: ThemePreferenceT) => ThemeT;
export declare const getThemePreference: () => ThemePreferenceT;
export declare const getTheme: () => ThemeT;
export declare const setThemePreference: (preference: ThemePreferenceT) => void;
export declare const toggleTheme: () => void;
export declare const subscribeToTheme: (listener: ThemeListenerT) => (() => void);
export declare const initTheme: () => ThemeStateT;
export declare const startTheme: () => void;
