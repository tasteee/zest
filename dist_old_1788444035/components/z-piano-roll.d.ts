export declare const ZPianoRoll: import("atomico/types/dom").Atomico<{
    props: {
        notes: {
            type: ArrayConstructor;
        };
        bars: {
            type: NumberConstructor;
            reflect: boolean;
        };
        beatsPerBar: {
            type: NumberConstructor;
            reflect: boolean;
        };
        snap: {
            type: NumberConstructor;
            reflect: boolean;
        };
        beatWidth: {
            type: NumberConstructor;
            reflect: boolean;
        };
        rowHeight: {
            type: NumberConstructor;
            reflect: boolean;
        };
        minPitch: {
            type: NumberConstructor;
            reflect: boolean;
        };
        maxPitch: {
            type: NumberConstructor;
            reflect: boolean;
        };
        mode: {
            type: StringConstructor;
            reflect: boolean;
        };
        fold: {
            type: StringConstructor;
            reflect: boolean;
        };
        scale: {
            type: StringConstructor;
            reflect: boolean;
        };
        root: {
            type: NumberConstructor;
            reflect: boolean;
        };
        defaultVelocity: {
            type: NumberConstructor;
            reflect: boolean;
        };
        playhead: {
            type: NumberConstructor;
            reflect: boolean;
        };
        hasToolbar: {
            type: BooleanConstructor;
            reflect: boolean;
            value: () => true;
        };
        hasKeyboard: {
            type: BooleanConstructor;
            reflect: boolean;
            value: () => true;
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
            notes: any[];
        }>;
        select: import("atomico").EventProp<{
            ids: number[];
        }>;
    };
    styles: CSSStyleSheet[];
}>;
