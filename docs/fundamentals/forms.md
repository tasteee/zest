# Forms

A zest control stands wherever a native one could. Put it in a `<form>` and the form sees it: it submits, it validates, it resets, it goes quiet inside a disabled `<fieldset>`. No wrapper, no hidden input, no framework.

## What it solves

A control inside a shadow root is invisible to the form around it. The real `<input>` is in there, but the form cannot see it, so nothing submits, `required` never blocks anything, and `form.reset()` does nothing. Every zest form control closes that gap the same way, through form-associated custom elements: the host is the form participant and speaks to the form through `ElementInternals`.

## The contract

Every one of these elements honours it: `z-input`, `z-textarea`, `z-number-input`, `z-checkbox`, `z-switch`, `z-radio-group`, `z-select`, `z-combobox`, `z-input-otp`, `z-slider`, `z-range` (both handles under one `name`), `z-color-picker`, `z-filter`, `z-toggle-button-group` (every pressed value under one `name` when `is-multiple`), and `z-button` for submit and reset.

| The form does | The control answers |
| --- | --- |
| Collects `FormData` | Contributes its value under the host's `name` attribute. A text-like control contributes an empty string while empty; a checkbox, switch or radio group contributes nothing until it has a value. Without a `name`, nothing. |
| Validates before submitting | Blocks the submit while `is-required` and empty, and fires `invalid` on the host. Type, range and step problems block too. The browser's own bubble points at the real input. |
| `reset()` | Returns to the value it had when it first rendered. |
| Disables a `<fieldset>` | Drops out of submission and validation, and paints itself disabled. Comes back when the fieldset does. |
| Restores state after navigation or autofill | Takes the value the browser saved. |
| Asks `form.elements` | Is listed there, like any control. |

And the host carries the native constraint-validation surface, so code written for an `<input>` keeps working:

| Member | What it does |
| --- | --- |
| `form` | The owning `<form>`, or `null`. |
| `validity` | A `ValidityState`: `valueMissing`, `typeMismatch`, `rangeUnderflow`, `customError` and the rest. |
| `validationMessage` | The message the browser would show. Native problems use the browser's own, localised text. |
| `willValidate` | `false` while disabled or readonly, as for a native control. |
| `labels` | Every `<label for>` pointing at the host. |
| `checkValidity()` | `true` or `false`, firing `invalid` on failure. |
| `reportValidity()` | The same, and shows the browser's bubble at the inner control. |
| `setCustomValidity(message)` | Marks the control invalid with your message; an empty string clears it. |

## In use

A validated form needs no JavaScript at all to refuse an empty required field:

```html
<form>
  <z-field label="Email">
    <z-input name="email" type="email" is-required></z-input>
  </z-field>
  <z-radio-group name="plan" is-required>
    <z-radio value="free">Free</z-radio>
    <z-radio value="pro">Pro</z-radio>
  </z-radio-group>
  <z-checkbox name="terms" value="accepted" is-required>I agree</z-checkbox>
  <z-button type="submit">Create account</z-button>
</form>
```

Reading it back is `new FormData(form)`, exactly as for native controls:

```js
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))
  // { email: 'a@b.c', plan: 'pro', terms: 'accepted' }
})
```

Async validation is `setCustomValidity`, the same as it would be on an `<input>`:

```js
const username = form.querySelector('z-input[name="username"]')
username.addEventListener('change', async (event) => {
  const taken = await isTaken(event.detail.value)
  username.setCustomValidity(taken ? 'That name is taken.' : '')
})
```

## Rules

- **`name` goes on the host.** It is a reflected attribute on every form control and it is what names the `FormData` entry. The inner input carries no name of its own.
- **Booleans stay questions.** `is-required`, `is-disabled`, `is-readonly` — not the native spellings. A native `disabled` or `readonly` attribute on the host is honoured by the platform as well, but the zest attributes are the ones the styling follows.
- **A radio group is one participant.** `name`, `is-required` and `is-disabled` belong on `z-radio-group`; the radios only carry `value`. Disabling the group disables its radios, and re-enabling it restores only the ones the group disabled. Arrow keys move the selection through the enabled radios, wrapping, as in a native group.
- **A submit button submits through the form.** `z-button type="submit"` calls `requestSubmit()` on the owning form, so validation runs and `submit` fires as the platform would fire it. Give it `name` and `value` and it contributes them for that submission only, as a native submitter does. `type="reset"` resets the form.
- **Enter submits from single-line controls.** `z-input` and `z-number-input` submit the owning form on Enter, validating first. `z-textarea` does not.
- **`z-select` and `z-combobox` validate the selection.** Search text in a combobox is not a value; `is-required` is satisfied only by a chosen option.
- **The default is the first value.** Reset restores the value the control had when it first rendered. Seed it with the `value` attribute (or `is-checked`) and reset goes back there.

## Where it stops

- Browsers without `ElementInternals` (Safari before 16.4) get the control without the form participation: it renders, it fires its events, and it is simply absent from the form. There is no partial polyfill.
- The number input's inner control is a text input, so range and step problems are worked out by zest, and their messages are zest's English until the locale registry lands.
