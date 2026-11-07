import type { Ref } from 'atomico';
declare const NATIVE_FLAGS: readonly ["valueMissing", "typeMismatch", "patternMismatch", "tooLong", "tooShort", "rangeUnderflow", "rangeOverflow", "stepMismatch", "badInput"];
export type ValidityFlagsT = Partial<Record<(typeof NATIVE_FLAGS)[number] | 'customError', boolean>>;
export type FormValueT = string | File | FormData | null;
export type FormRestoreModeT = 'restore' | 'autocomplete';
export type FormControlConfigT = {
    /** The entry submitted under the host's `name`. `null` submits nothing (an unchecked checkbox). */
    value: FormValueT;
    /** True when the component's own `is-disabled` prop is set. */
    isDisabled?: boolean;
    /** True when the component's own `is-readonly` prop is set. Readonly controls are not validated, as in the platform. */
    isReadonly?: boolean;
    /** The native control inside the shadow root. Its ValidityState is mirrored and it anchors the validation bubble. */
    control?: Ref<HTMLElement | undefined>;
    /** Validity the component works out itself, merged over the mirrored native flags. */
    validity?: {
        flags: ValidityFlagsT;
        message?: string;
    };
    /** Pressing Enter in a single-line control submits the owning form, as it would in a native input. */
    submitsOnEnter?: boolean;
    /** Called by form.reset(): put the control back to its default. */
    onReset: () => void;
    /** Called by the browser restoring state after navigation or autofill. */
    onRestore?: (state: FormValueT, mode: FormRestoreModeT) => void;
};
export type FormControlT = {
    internals: ElementInternals | null;
    /** True while an ancestor <fieldset disabled> or the form itself disables this control. Combine with the component's own prop. */
    isFormDisabled: boolean;
    /** Submits the owning form the way a native control's Enter key would, running validation first. */
    requestSubmit: () => void;
};
export declare const useFormControl: (config: FormControlConfigT) => FormControlT;
/**
 * Registers a form-associated element and gives its prototype the same
 * constraint-validation surface a native control has. The component must
 * pass `form: true` to `c()` and call `useFormControl` in its view.
 */
export declare const defineFormElement: (name: string, constructor: CustomElementConstructor) => void;
/** The public surface `defineFormElement` adds to a control's instances. */
export type FormControlHostT = {
    readonly form: HTMLFormElement | null;
    readonly validity: ValidityState;
    readonly validationMessage: string;
    readonly willValidate: boolean;
    readonly labels: NodeList;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setCustomValidity(message: string): void;
};
export {};
