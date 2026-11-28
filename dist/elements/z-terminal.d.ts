export declare const ZTerminal: import("atomico/types/dom").Atomico<{
    props: {
        code: StringConstructor;
        shell: StringConstructor;
        cwd: StringConstructor;
        prompt: StringConstructor;
        copyLines: StringConstructor;
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "success" | "warning" | "danger">;
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
        isReplayHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isAutoScrollDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        copy: import("atomico").EventProp<string>;
        done: import("atomico").EventProp<void>;
    };
    styles: import("atomico").Sheet[];
}>;
