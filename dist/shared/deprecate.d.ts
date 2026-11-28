export declare const warnDeprecated: (subject: string, replacement: string) => void;
type LegacyOrientationT = {
    tag: string;
    attribute: string;
    value: unknown;
    flag: string;
    flagValue: string;
};
export declare const warnLegacyOrientation: (legacy: LegacyOrientationT) => void;
export {};
