export declare const ZPatternRoll: import("atomico/types/dom").Atomico<{
    props: {
        signals: {
            type: ArrayConstructor;
        };
        tones: {
            type: NumberConstructor;
            reflect: boolean;
        };
        toneMargin: {
            type: NumberConstructor;
            reflect: boolean;
        };
        chordSize: {
            type: NumberConstructor;
            reflect: boolean;
        };
        length: {
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
        mode: {
            type: StringConstructor;
            reflect: boolean;
        };
        defaultVelocity: {
            type: NumberConstructor;
            reflect: boolean;
        };
        defaultOctave: {
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
            signals: any[];
        }>;
        select: import("atomico").EventProp<{
            ids: number[];
        }>;
    };
    styles: CSSStyleSheet[];
}>;
