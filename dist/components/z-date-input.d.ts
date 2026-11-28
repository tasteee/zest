import './z-calendar';
export declare const ZDateInput: import("atomico/types/dom").Atomico<{
    props: {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        format: {
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
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        placeholder: StringConstructor;
        startPlaceholder: StringConstructor;
        endPlaceholder: StringConstructor;
        size: {
            type: import("atomico").CustomType<"lg" | "md" | "sm">;
            reflect: boolean;
        };
        tone: {
            type: import("atomico").CustomType<"primary" | "secondary" | "tertiary">;
            reflect: boolean;
        };
        isRange: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        hasCalendar: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isInvalid: {
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
        isRequired: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        isFullWidth: {
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
        description: StringConstructor;
        error: StringConstructor;
    };
    styles: CSSStyleSheet[];
    form: true;
}>;
