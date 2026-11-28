import { type ChildItemT } from './child-items';
export type MenuItemTypeT = 'action' | 'radio' | 'checkbox';
export type MenuRowT = {
    value?: string;
    label?: string;
    icon?: string;
    shortcut?: string;
    /** a second, smaller line under the label */
    description?: string;
    type?: MenuItemTypeT;
    isChecked?: boolean;
    isDisabled?: boolean;
    isSeparator?: boolean;
    /** a non-focusable section heading (z-menu-label) */
    isHeading?: boolean;
    isDanger?: boolean;
    /** slot name carrying a declarative child's own content */
    slot?: string;
};
export declare const MENU_ROW_TAGS: string[];
export declare const MENU_ROW_ATTRIBUTES: string[];
/** A declarative child as a row record. */
export declare const readMenuRow: (child: ChildItemT) => MenuRowT;
/** Rows the keyboard and typeahead can land on. */
export declare const isSelectableRow: (row: MenuRowT | undefined) => boolean;
export declare const menuItemRole: (row: MenuRowT) => string;
export declare const menuItemChecked: (row: MenuRowT) => string | undefined;
/** Reports rows a menu cannot draw correctly (Rule 21). */
export declare const reportMenuRowMisuse: (host: Element, rows: MenuRowT[], rawTypes: Array<string | null | undefined>) => void;
export type MenuEntryT = {
    row: MenuRowT;
    index: number;
};
export type MenuSectionT = {
    type: 'separator';
    index: number;
} | {
    type: 'rows';
    heading?: MenuEntryT;
    entries: MenuEntryT[];
};
export declare const groupMenuRows: (rows: MenuRowT[]) => MenuSectionT[];
export declare const headingId: (index: number) => string;
export declare const descriptionId: (index: number) => string;
/** Whether any row in the menu is checkable, so every row reserves the check column. */
export declare const hasCheckableRows: (rows: MenuRowT[]) => boolean;
/** The leading check column. Rendered for every row once the menu has a checkable row, so labels align. */
export declare const renderCheck: (row: MenuRowT, shouldReserve: boolean) => any;
/** The label, with the description as a second line under it. */
export declare const renderRowText: (row: MenuRowT, index: number) => any;
export declare const menuRowStyles: CSSStyleSheet;
