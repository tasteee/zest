export declare const ZImage: import("atomico/types/dom").Atomico<{
    props: {
        src: StringConstructor;
        srcset: StringConstructor;
        sizes: StringConstructor;
        alt: StringConstructor;
        ratio: StringConstructor;
        caption: StringConstructor;
        focalPoint: StringConstructor;
        fit: {
            type: import("atomico").CustomType<"fill" | "contain" | "none" | "cover" | "scale-down">;
            reflect: boolean;
        };
        radius: {
            type: import("atomico").CustomType<"xl" | "lg" | "md" | "sm" | "none" | "full">;
            reflect: boolean;
        };
        isEager: {
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
        error: import("atomico").EventProp<{
            src: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
