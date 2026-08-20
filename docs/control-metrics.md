# Control metrics

Controls that sit next to each other have to agree about height. Before this
existed they didn't: `z-input` and `z-combobox` were 44px at medium while
`z-button`, `z-select`, `z-toggle` and `z-number-input` were 40, and nothing in
the codebase said which was correct.

## One height scale

| Token | Value | |
| --- | --- | --- |
| `--control-height-sm` | `2rem` | 32px |
| `--control-height-md` | `2.5rem` | 40px |
| `--control-height-lg` | `3rem` | 48px |

Consumed by `z-button`, `z-input`, `z-select`, `z-combobox`, `z-number-input`,
`z-toggle`, `z-toggle-group`, `z-color-picker`, `z-theme-switcher` and
`z-field`. Retiming the scale moves all of them together.

Padding deliberately stays per-component. A button wants more inline room than
a text field at the same height, and unifying that would make both worse.
Height is what has to match; padding is taste.

## Labelled controls

A labelled control is three bands stacked. Fixing the first two means every
labelled control in a row resolves to the same total height regardless of what
is inside it:

| Token | Value | |
| --- | --- | --- |
| `--field-label-height` | `1.25rem` | 20px |
| `--field-gap` | `0.25rem` | 4px |
| `--control-height-md` | `2.5rem` | 40px |
| **`--field-row-height`** | **`4rem`** | **64px** |

The label height is *set* rather than left to `line-height`. A label that wraps,
or one rendered in a theme with different font metrics, would otherwise silently
change the height of the whole row and break alignment with its neighbours.

## Mixing switches with selects

The awkward case: a switch track is 22px and labels *beside* itself, while a
select is 40px and labels *above*. Dropped into the same row they don't align at
all — one occupies ~22px, the other 64.

`z-field` is what resolves this. A top-labelled field uses all three bands. A
switch keeps its label beside the track and uses `is-label-reserved` to leave
the first band empty. Both controls then land in the same fixed-height control
band, so the compact switch track centres inside the same 40px a select fills:

```html
<wired-row gap="md" align="start">
  <z-field label="Region">
    <z-select placeholder="Choose…"></z-select>
  </z-field>

  <z-field is-label-reserved>
    <z-switch>Notifications</z-switch>
  </z-field>

  <z-field is-label-reserved>
    <z-button kind="solid" tone="primary">Save</z-button>
  </z-field>
</wired-row>
```

All three are 64px tall and their controls share one 40px band.

The switch track stays compact, but its clickable label occupies the full
control height. That gives it the same vertical rhythm and target size as the
input without making the track itself look oversized.

### Reserving the label row

`is-label-reserved` renders the label band empty. Without it an inline-labelled
switch or an unlabelled button rides 24px high in a row of top-labelled fields.

It renders an empty band rather than a blank label, so nothing is announced to a
screen reader that isn't there. Use `is-label-hidden` instead when the control
does have a name that should reach assistive technology but not the screen.

### Sizing the band

`is-small` and `is-large` on `z-field` move the band to match the control
inside it:

```html
<z-field label="Port" is-small>
  <z-input size="small" placeholder="8080"></z-input>
</z-field>
```

## Attributes

| Attribute | Description |
| --- | --- |
| `is-label-reserved` | Keeps the label band's height with no label in it. |
| `is-label-hidden` | Keeps the label for assistive technology, removes it visually and from layout. |
| `is-small` / `is-large` | Moves the control band to the matching height. |
