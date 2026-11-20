# Framework code in the docs

Every example's **Code** tab, the API tables, and a few prose snippets show code for the reader's framework: HTML, React, Vue, Svelte or Solid. The live preview always runs the HTML version.

## How a demo's code is chosen

For a demo at `demos/<element>/<name>.html` (`demo-code.ts`):

1. **A hand-written file beside it wins:** `<name>.react.tsx`, `<name>.vue`, `<name>.svelte`, `<name>.solid.tsx`.
2. **Markup-only demos** (no `<name>.js`) are converted from the HTML automatically.
3. **A demo with a script but no hand-written file** shows the HTML + JS with a note saying so.

So a new demo that's only markup needs nothing extra. A demo with a `<name>.js` needs all four framework files. `pnpm check:framework-demos` fails until they exist.

## Writing a framework file

Each file is a complete component a reader can copy. It's named `Example` (React and Solid). Import `@tasteee/zest` and, if the demo has a stylesheet, `./styles.css`. Match the HTML version's markup and behaviour.

| | Fixed values | Dynamic values, arrays, objects | Events |
|---|---|---|---|
| React 19 | `isOpen`, `kind="outline"` | `items={items}` | `onchange={…}` (lowercase) |
| Vue 3 | `is-open`, `kind="outline"` | `:items="items"`, `:isOpen="isOpen"` | `@change="…"` |
| Svelte 5 | `is-open`, `kind="outline"` | `items={items}`, `isOpen={isOpen}` | `onchange={…}` |
| Solid 1 & 2 | `is-open=""`, `kind="outline"` | `prop:items={items}`, `prop:isOpen={isOpen()}` | `onChange={…}` |

The mistakes these rules avoid all compile but break at runtime:

- **React:** `onChange` / `onSelect` are React's synthetic events, so the zest event's `detail` is only reachable through `event.nativeEvent`.
- **Vue / Svelte:** a kebab-case dynamic binding (`:is-open`) is written as an attribute, so an array arrives as text. Bind the camelCase property.
- **Solid 1** lowercases an unprefixed camelCase prop (`isOpen` → `isopen`). **Solid 2** writes an unprefixed dynamic value as an attribute, and removed `attr:` and `on:`. `prop:` plus plain string attributes works in both.
- **Vue / Svelte:** a literal `</script>` inside a string ends the script block. Write `<\/script>`.

## Checks

- `pnpm typecheck:site` typechecks the React files against the generated JSX types. `.solid.tsx` files are excluded, since they use Solid's JSX.
- `pnpm check:framework-demos` checks coverage and the patterns above. With `@vue/compiler-sfc`, `svelte`, `@babel/core` and `babel-preset-solid` installed, it also compiles every Vue, Svelte and Solid file.

## The other pieces

- `framework-storage.ts`: the saved choice, `useFramework()`, and the `?framework=` link parameter.
- `FrameworkPicker.tsx`: the settings dropdown, the example toolbar dropdown, and the Introduction page's switch.
- `api-usage.ts`: how the API tables name attributes and events per framework.
- `MarkupCode.tsx` / `CaptionAttribute.tsx`: framework-aware snippets and caption names in prose pages.
- `mark-framework-page.ts`: the "Yours" badge on the matching Usage page in the sidebar.
