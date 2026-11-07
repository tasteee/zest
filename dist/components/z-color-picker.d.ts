export declare const ZColorPicker: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        label: StringConstructor;
        presets: {
            type: ArrayConstructor;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
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
        change: import("atomico").EventProp<{
            value: string;
        }>;
    };
    styles: CSSStyleSheet;
    form: true;
}>;
