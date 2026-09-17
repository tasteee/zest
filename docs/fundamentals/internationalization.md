# Internationalization

Zest ships in English, lays out for left-to-right, and loads no fonts. Each of those is a default an app can change in one place, not a property of the components.

## What it solves

A component library says a handful of things on its own — a close button's name, an empty table's "No data", a validation message the browser has no text for — and it decides which side of a control the label sits on. If those are baked in, every other language and every right-to-left script is a fork. They are not baked in.

## Strings

Every string zest writes itself lives in one table, `englishStrings`, and any of them can be replaced once per app:

```js
import { setLocale } from '@tasteee/zest'

setLocale({
  close: 'Fermer',
  dismiss: 'Fermer',
  noData: 'Aucune donnée',
  selectPlaceholder: 'Choisir…'
})
```

Every mounted element re-renders with the new strings, so a language switch mid-session reaches the page. Keys left out keep their English. Strings with a `{placeholder}` are filled by the component. What the platform already localises — a native `required` or `type="email"` failure — is not here; the browser's own text is used.

| Key | English | Where |
| --- | --- | --- |
| `close` | Close | `z-dialog` close button |
| `dismiss` | Dismiss | `z-alert`, `z-toast` dismiss buttons |
| `clear` | Clear | `z-filter` reset |
| `notifications` | Notifications | `z-toast` region name |
| `noData` | No data | `z-table` empty state |
| `noOptions` | No options | `z-select` with no options |
| `noMatches` | No matches | `z-combobox` with no matching options |
| `options` | Options | the listbox name in `z-select` and `z-combobox` |
| `selectPlaceholder` | Select… | `z-select` with nothing chosen |
| `searchPlaceholder` | Search… | `z-combobox` with nothing typed |
| `decreaseValue` / `increaseValue` | Decrease value / Increase value | `z-number-input` steppers |
| `lowerValue` / `upperValue` | Lower value / Upper value | `z-range` handles without a label |
| `digitOf` | Digit {index} of {length} | `z-input-otp` cells |
| `row` / `column` | row / column | `z-table-toolbar` axis handle |
| `selectAxis` / `insertAxisAfter` / `removeAxis` | Select {axis} / Insert {axis} after / Remove {axis} | `z-table-toolbar` axis handle |
| `invalidValue` | Invalid value. | fallback validation message |
| `selectOneOfTheseOptions` | Please select one of these options. | `z-radio-group` required |
| `selectAnItemInTheList` | Please select an item in the list. | `z-select`, `z-combobox` required |
| `enterANumber` | Please enter a number. | `z-number-input` bad input |
| `valueAtLeast` / `valueAtMost` | Value must be greater than or equal to {min}. / …less than or equal to {max}. | `z-number-input` range |
| `valueOnStep` | Please enter a valid value. The nearest valid values are {low} and {high}. | `z-number-input` step |
| `enterTheCode` | Please enter all {length} characters. | `z-input-otp` required |

A test holds this table to `englishStrings`: a new key has to be documented here before it can ship.

## Direction

Spacing inside the components is written with logical properties — `margin-inline-start`, `border-inline-end`, `border-start-start-radius` — so `dir="rtl"` on any ancestor mirrors them: a toast's accent bar and close button swap sides, a switch's track moves to the other side of its label, a button group's rounded corners follow the row. `z-tabs` swaps its arrow keys so → still moves toward the next tab visually. The rule is enforced: `scripts/check-css-templates.mjs` refuses a physical `margin-left` in a component stylesheet.

Overlays are the exception on purpose. A popover, tooltip or menu panel is placed from measured rectangles by `shared/overlay.ts`, and its `left`/`right` are physical because the rectangles are; those lines are marked `/* physical */`.

The library sets no `dir` itself. Set it on `<html>` (or a region) and everything inside follows.

## Fonts

`ink.css` names the font families and fetches none of them. `@tasteee/zest/fonts.css` is the opt-in that loads them from Google Fonts; leave it out and declare `@font-face` for the same names to self-host — see the README, "Fonts". A page that imports only `ink.css` and the elements makes no network request for a font.

## Where it stops

- Strings inside `z-*` elements are the only ones covered. An app's own labels, placeholders and options are the app's.
- Numbers and dates are not formatted by zest; `z-number-input` parses and prints with `.` as the decimal mark.
- Physical `left`/`right` remain in components outside the core set; they are converted as each is reviewed.
