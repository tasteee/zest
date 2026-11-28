import { type ColorDetailT, type ColorFormatT } from '../shared/color';
import './z-popover';
import './z-color-panel';
import './z-color-swatch';
export declare const ZColorPicker: import("atomico/types/dom").Atomico<{
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
        presets: {
            type: ArrayConstructor;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
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
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
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
        toggle: import("atomico").EventProp<{
            open: boolean;
        }>;
        placement: {
            type: import("atomico").CustomType<"bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-center" | "bottom-start" | "left-end" | "left-center" | "left-start" | "right-end" | "right-center" | "right-start" | "top-end" | "top-center" | "top-start">;
            reflect: boolean;
        };
        offset: {
            type: NumberConstructor;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
