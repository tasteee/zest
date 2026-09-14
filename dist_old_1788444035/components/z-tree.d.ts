type TreeNode = {
    id: string;
    label?: string;
    icon?: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
};
export declare const ZTree: import("atomico/types/dom").Atomico<{
    props: {
        items: {
            type: ArrayConstructor;
        };
        selection: {
            type: StringConstructor;
            reflect: boolean;
        };
        selected: {
            type: ArrayConstructor;
        };
        expanded: {
            type: ArrayConstructor;
        };
        doesShowGuides: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        select: import("atomico").EventProp<{
            ids: string[];
            node: TreeNode;
        }>;
        expand: import("atomico").EventProp<{
            id: string;
        }>;
        collapse: import("atomico").EventProp<{
            id: string;
        }>;
        activate: import("atomico").EventProp<{
            id: string;
            node: TreeNode;
        }>;
    };
    styles: CSSStyleSheet;
}>;
export {};
