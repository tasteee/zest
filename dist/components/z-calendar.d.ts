export declare const ZCalendar: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        month: {
            type: StringConstructor;
            reflect: boolean;
        };
        min: {
            type: StringConstructor;
            reflect: boolean;
        };
        max: {
            type: StringConstructor;
            reflect: boolean;
        };
        firstDayOfWeek: {
            type: NumberConstructor;
            reflect: boolean;
        };
        locale: StringConstructor;
        label: StringConstructor;
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isRange: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isDisabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isReadOnly: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isBorderless: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isHidden: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        input: import("atomico").EventProp<{
            value: string | null;
            start: string | null;
            end: string | null;
        }>;
        change: import("atomico").EventProp<{
            value: string | null;
            start: string | null;
            end: string | null;
        }>;
        monthchange: import("atomico").EventProp<{
            month: string;
        }>;
    };
    styles: CSSStyleSheet[];
}>;
