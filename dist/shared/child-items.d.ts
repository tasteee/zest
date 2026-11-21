export type ChildItemT = {
    /** the child's tag name, e.g. 'z-menu-item' or 'z-menu-separator' */
    tag: string;
    value: string;
    label: string;
    /** slot name carrying the child's own content */
    slot: string;
    /** every observed attribute, raw ('' for present boolean attributes) */
    attributes: Record<string, string | null>;
};
export declare const useChildItems: (tag: string | string[], attributes: string[]) => ChildItemT[];
/** `is-foo` attribute present? (boolean attributes read as '' when set) */
export declare const hasFlag: (item: ChildItemT, name: string) => boolean;
