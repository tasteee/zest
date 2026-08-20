# z-spacer

An empty, non-semantic spacing element. Give it a fixed `size` on both axes, or
set `can-grow` when the parent layout should let it absorb remaining space.

```html
<wired-row>
  <span>Brand</span>
  <z-spacer can-grow></z-spacer>
  <z-button>Sign in</z-button>
</wired-row>

<z-spacer size="lg"></z-spacer>
```

## Attributes

| Attribute | Values | Description |
| --- | --- | --- |
| `size` | size token / length | fixed size on both axes |
| `can-grow` | boolean | absorb remaining space in a compatible parent layout |

See [z-box](../foundation/z-box.md) for the size token scale.

## Slots

None.
