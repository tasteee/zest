import type { ColorDetailT, ColorFormatT } from './shared/color.d.ts';
export declare const ZColorPanel: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        format: {
            type: import("atomico").CustomType<"hex" | "rgb" | "hsl" | "hsb" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "p3">;
            reflect: boolean;
        };
        formats: {
            type: ArrayConstructor;
        };
        swatches: {
            type: ArrayConstructor;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        hasAlpha: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        hasEyedropper: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isChannelsHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isCopyHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        input: import("atomico").EventProp<ColorDetailT>;
        change: import("atomico").EventProp<ColorDetailT>;
        formatchange: import("atomico").EventProp<{
            value: string;
            format: ColorFormatT;
        }>;
        copy: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: import("atomico").Sheet[];
    form: true;
}>;
