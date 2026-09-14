export declare const ZTerminal: import("atomico/types/dom").Atomico<{
    props: {
        code: StringConstructor;
        shell: StringConstructor;
        cwd: StringConstructor;
        prompt: StringConstructor;
        copyLines: StringConstructor;
        accent: {
            type: StringConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        width: StringConstructor;
        height: StringConstructor;
        maxHeight: StringConstructor;
        doesAnimate: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        doesStartOnView: {
            type: BooleanConstructor;
        };
        lines: {
            type: ArrayConstructor;
        };
        typeSpeed: {
            type: NumberConstructor;
        };
        lineDelay: {
            type: NumberConstructor;
        };
        fadeDuration: {
            type: NumberConstructor;
        };
        doesLoop: {
            type: BooleanConstructor;
        };
        loopDelay: {
            type: NumberConstructor;
        };
        hasReplay: {
            type: BooleanConstructor;
            value: () => true;
        };
        doesAutoScroll: {
            type: BooleanConstructor;
            value: () => true;
        };
        copy: import("atomico").EventProp<string>;
        done: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
