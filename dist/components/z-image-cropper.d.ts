import './z-slider';
export type CropRectT = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type CropDetailT = CropRectT & {
    zoom: number;
};
export type CropCanvasOptionsT = {
    width?: number;
    height?: number;
};
export type CropCanvasT = {
    width: number;
    height: number;
    toBlob: (callback: (blob: Blob | null) => void, type?: string, quality?: number) => void;
    toDataURL: (type?: string, quality?: number) => string;
};
export type ImageCropperMethodsT = {
    getCrop: () => CropRectT | null;
    toCanvas: (options?: CropCanvasOptionsT) => CropCanvasT | null;
    toBlob: (type?: string, quality?: number) => Promise<Blob | null>;
    toDataURL: (type?: string, quality?: number) => string | null;
    reset: () => void;
};
export declare const ZImageCropper: import("atomico/types/dom").Atomico<{
    props: {
        src: StringConstructor;
        alt: StringConstructor;
        aspect: StringConstructor;
        zoom: {
            type: NumberConstructor;
            reflect: boolean;
        };
        maxZoom: {
            type: NumberConstructor;
            reflect: boolean;
        };
        shape: {
            type: import("atomico").CustomType<"circle" | "rect">;
            reflect: boolean;
        };
        crossOrigin: {
            type: import("atomico").CustomType<"anonymous" | "use-credentials">;
            reflect: boolean;
        };
        isZoomHidden: {
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
        load: import("atomico").EventProp<{
            width: number;
            height: number;
        }>;
        input: import("atomico").EventProp<{
            x: number;
            y: number;
            width: number;
            height: number;
            zoom: number;
        }>;
        change: import("atomico").EventProp<{
            x: number;
            y: number;
            width: number;
            height: number;
            zoom: number;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
