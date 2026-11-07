export declare const englishStrings: {
    readonly close: "Close";
    readonly dismiss: "Dismiss";
    readonly clear: "Clear";
    readonly notifications: "Notifications";
    readonly dismissNotification: "Dismiss notification";
    readonly noData: "No data";
    readonly noOptions: "No options";
    readonly noMatches: "No matches";
    readonly options: "Options";
    readonly selectPlaceholder: "Select…";
    readonly searchPlaceholder: "Search…";
    readonly decreaseValue: "Decrease value";
    readonly increaseValue: "Increase value";
    readonly invalidValue: "Invalid value.";
    readonly selectOneOfTheseOptions: "Please select one of these options.";
    readonly selectAnItemInTheList: "Please select an item in the list.";
    readonly enterANumber: "Please enter a number.";
    readonly valueAtLeast: "Value must be greater than or equal to {min}.";
    readonly valueAtMost: "Value must be less than or equal to {max}.";
    readonly valueOnStep: "Please enter a valid value. The nearest valid values are {low} and {high}.";
    readonly enterTheCode: "Please enter all {length} characters.";
    readonly digitOf: "Digit {index} of {length}";
    readonly lowerValue: "Lower value";
    readonly upperValue: "Upper value";
    readonly rangeSeparator: "to";
    readonly row: "row";
    readonly column: "column";
    readonly selectAxis: "Select {axis}";
    readonly insertAxisAfter: "Insert {axis} after";
    readonly removeAxis: "Remove {axis}";
    readonly cancel: "Cancel";
    readonly confirm: "Confirm";
    readonly learnMore: "Learn more";
    readonly remove: "Remove";
    readonly previousSlide: "Previous slide";
    readonly nextSlide: "Next slide";
    readonly files: "Files";
    readonly chooseColor: "Choose color";
    readonly saturationAndBrightness: "Saturation and brightness";
    readonly hue: "Hue";
    readonly commandSearch: "Command search";
    readonly commandResults: "Commands";
    readonly commandPlaceholder: "Type a command or search…";
    readonly commandEmpty: "No results found.";
    readonly removeSelectedFiles: "Remove selected files";
    readonly pagination: "Pagination";
    readonly previousPage: "Previous page";
    readonly nextPage: "Next page";
    readonly colorTheme: "Color theme";
    readonly themeLight: "Light";
    readonly themeDark: "Dark";
    readonly themeSystem: "System";
    readonly switchToLight: "Switch to light theme";
    readonly switchToDark: "Switch to dark theme";
    readonly dropFilesHere: "Drop files here or click to browse";
    readonly filesSelected: "{count} files selected";
    readonly goToSlide: "Go to slide {index}";
    readonly showMore: "Show more";
    readonly showLess: "Show less";
    readonly copy: "Copy";
    readonly copied: "Copied";
};
export type LocaleStringsT = {
    [Key in keyof typeof englishStrings]: string;
};
export type LocaleKeyT = keyof LocaleStringsT;
export type LocaleParamsT = Record<string, string | number>;
/** Replaces zest's strings. Keys left out keep their English. Every mounted element re-renders. */
export declare const setLocale: (strings: Partial<LocaleStringsT>) => void;
/** The current strings, overrides merged over English. */
export declare const getLocale: () => LocaleStringsT;
export declare const getLocaleString: (key: LocaleKeyT, params?: LocaleParamsT) => string;
/**
 * A translator bound to the current locale that re-renders the host when
 * `setLocale` runs, so a language switch reaches every element on the page.
 */
export declare const useLocale: () => ((key: LocaleKeyT, params?: LocaleParamsT) => string);
