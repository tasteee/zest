export type NestedOptionT = {
    value: string;
    label: string;
    isDisabled?: boolean;
    children?: NestedOptionT[];
    /**
     * A headed group instead of a branch: its children are shown inline at
     * this level under a non-selectable heading (the label). The group's own
     * value is never committed.
     */
    isGroup?: boolean;
};
/** An option after groups are flattened: which group it sits in, if any. */
export type FlatOptionT = NestedOptionT & {
    groupId?: string;
    groupLabel?: string;
    children?: FlatOptionT[];
};
export type FlattenResultT = {
    options: FlatOptionT[];
    hasEmptyGroup: boolean;
};
export declare const flattenOptionGroups: (options: NestedOptionT[]) => FlattenResultT;
export type OptionSegmentT = {
    groupId?: string;
    groupLabel?: string;
    entries: Array<{
        option: FlatOptionT;
        index: number;
    }>;
};
/** Consecutive options of one level, split wherever the group changes. */
export declare const segmentByGroup: (nodes: FlatOptionT[]) => OptionSegmentT[];
export declare const hasChildren: (option: NestedOptionT | undefined) => boolean;
/** The option a path points at, or undefined when the path leaves the tree. */
export declare const nodeAt: (options: NestedOptionT[], path: number[]) => NestedOptionT | undefined;
/** The sibling list a path lives in (the roots for a one-entry path). */
export declare const siblingsOf: (options: NestedOptionT[], path: number[]) => NestedOptionT[];
/** Index path to the first option carrying `value`, depth-first. */
export declare const findPath: (options: NestedOptionT[], value: unknown) => number[] | undefined;
/** The option values along a path, root first. */
export declare const valuesAlong: (options: NestedOptionT[], path: number[]) => string[];
/** Indices of the options in a list that can take focus. */
export declare const enabledIndicesOf: (nodes: NestedOptionT[]) => number[];
