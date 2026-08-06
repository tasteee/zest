# z-spacer

Empty spacing inside a flex layout. Give it a fixed `size` (applied to both axes,
so it works in a row or a column), or set `can-grow` to soak up the remaining space —
handy for pushing trailing items to the end of a toolbar.

```html
<z-row>
  <span>Brand</span>
  <z-spacer can-grow></z-spacer>
  <z-button>Sign in</z-button>
</z-row>

<z-spacer size="lg"></z-spacer>
```

## Attributes

| Attribute | Values | Description |
| --- | --- | --- |
| `size` | size token / length | fixed size on both axes |
| `can-grow` | boolean | flex-grow to fill remaining space |

See [z-box](../foundation/z-box.md) for the size token scale.

## Slots

None.
