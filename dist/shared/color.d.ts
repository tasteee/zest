export type ColorFormatT = 'hex' | 'rgb' | 'hsl' | 'hsb' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'p3';
export type ColorSpaceT = 'hsv' | 'hsl' | 'lab' | 'lch' | 'oklab' | 'oklch';
export type ColorGroupT = 'standard' | 'perceptual' | 'wideGamut';
export type TripletT = [number, number, number];
export type ColorStateT = {
    space: ColorSpaceT;
    coords: TripletT;
    alpha: number;
};
export type RgbaT = {
    red: number;
    green: number;
    blue: number;
    alpha: number;
};
export type ParsedColorT = {
    format: ColorFormatT;
    state: ColorStateT;
};
export type ChannelKeyT = 'red' | 'green' | 'blue' | 'hue' | 'saturation' | 'lightness' | 'brightness' | 'whiteness' | 'blackness' | 'chroma' | 'greenRed' | 'blueYellow' | 'alpha';
export type ChannelT = {
    key: ChannelKeyT;
    symbol: string;
    min: number;
    max: number;
    step: number;
    precision: number;
};
export type FormatDefinitionT = {
    format: ColorFormatT;
    label: string;
    group: ColorGroupT;
    space: ColorSpaceT;
    channels: ChannelT[];
};
export type AxisT = {
    coordIndex: number;
    min: number;
    max: number;
    isWrapping: boolean;
};
export type SpaceLayoutT = {
    areaX: AxisT;
    areaY: AxisT;
    slider: AxisT;
    areaLabelKey: 'saturationAndBrightness' | 'saturationAndLightness' | 'chromaAndLightness' | 'colorAxes';
    sliderLabelKey: 'hue' | 'lightness';
};
export declare const COLOR_FORMATS: ColorFormatT[];
export declare const COLOR_GROUPS: ColorGroupT[];
export declare const clampNumber: (value: number, min: number, max: number) => number;
export declare const roundNumber: (value: number, precision: number) => number;
export declare const isRgbInGamut: (rgb: TripletT) => boolean;
export declare const fitStateToGamut: (state: ColorStateT) => ColorStateT;
export declare const stateToRgba: (state: ColorStateT) => RgbaT;
export declare const rgbaToState: (rgba: RgbaT, space: ColorSpaceT, previous?: ColorStateT | null) => ColorStateT;
export declare const convertState: (state: ColorStateT, space: ColorSpaceT, previous?: ColorStateT | null) => ColorStateT;
export declare const FORMAT_DEFINITIONS: Record<ColorFormatT, FormatDefinitionT>;
export declare const ALPHA_CHANNEL: ChannelT;
export declare const checkIsColorFormat: (candidate: unknown) => candidate is ColorFormatT;
export declare const getFormatSpace: (format: ColorFormatT) => ColorSpaceT;
export declare const readChannels: (state: ColorStateT, format: ColorFormatT) => number[];
export declare const buildStateFromChannels: (format: ColorFormatT, values: number[], alpha: number, previous?: ColorStateT | null) => ColorStateT;
export declare const formatHex: (rgba: RgbaT) => string;
export declare const formatColor: (state: ColorStateT, format: ColorFormatT) => string;
export declare const parseColor: (input: string | null | undefined) => ParsedColorT | null;
export declare const SPACE_LAYOUTS: Record<ColorSpaceT, SpaceLayoutT>;
export type AreaPointT = {
    x: number;
    y: number;
};
export declare const getAreaPoint: (state: ColorStateT) => AreaPointT;
export declare const setAreaPoint: (state: ColorStateT, point: AreaPointT) => ColorStateT;
export declare const getSliderFraction: (state: ColorStateT) => number;
export declare const setSliderFraction: (state: ColorStateT, fraction: number) => ColorStateT;
export declare const getAreaPixel: (state: ColorStateT, point: AreaPointT) => TripletT | null;
export declare const getSliderStops: (state: ColorStateT) => string[];
export declare const getRelativeLuminance: (rgba: RgbaT) => number;
export declare const DEFAULT_COLOR = "#BF40BF";
export type ColorDetailT = {
    value: string;
    format: ColorFormatT;
    hex: string;
    alpha: number;
};
export type ResolvedColorT = {
    format: ColorFormatT;
    state: ColorStateT;
    text: string;
};
export declare const resolveAllowedFormats: (requested: unknown) => ColorFormatT[];
export declare const resolveColor: (value: unknown, requestedFormat: unknown, allowed: ColorFormatT[]) => ResolvedColorT;
export declare const buildColorDetail: (state: ColorStateT, format: ColorFormatT) => ColorDetailT;
