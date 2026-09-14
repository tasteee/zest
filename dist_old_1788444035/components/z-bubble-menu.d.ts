type AlignT = 'left' | 'center' | 'right';
type RowColPositionT = 'before' | 'after';
export declare const ZBubbleMenu: import("atomico/types/dom").Atomico<{
    props: {
        kind: {
            type: StringConstructor;
            reflect: boolean;
        };
        anchorRect: null;
        placement: {
            type: StringConstructor;
            reflect: boolean;
        };
        offset: {
            type: NumberConstructor;
        };
        isOpen: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        url: {
            type: StringConstructor;
        };
        align: {
            type: StringConstructor;
        };
        hasCaption: {
            type: BooleanConstructor;
        };
        linkchange: import("atomico").EventProp<{
            url: string;
        }>;
        linkopen: import("atomico").EventProp<void>;
        linkunlink: import("atomico").EventProp<void>;
        imagealign: import("atomico").EventProp<{
            align: AlignT;
        }>;
        imagecaptiontoggle: import("atomico").EventProp<void>;
        imagereplace: import("atomico").EventProp<void>;
        imagedelete: import("atomico").EventProp<void>;
        tableinsertrow: import("atomico").EventProp<{
            position: RowColPositionT;
        }>;
        tabledeleterow: import("atomico").EventProp<void>;
        tableinsertcolumn: import("atomico").EventProp<{
            position: RowColPositionT;
        }>;
        tabledeletecolumn: import("atomico").EventProp<void>;
        tablemerge: import("atomico").EventProp<void>;
    };
    styles: CSSStyleSheet[];
}>;
export {};
