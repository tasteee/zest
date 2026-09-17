# Framework examples

One small app per framework, each building the same validated-form flow from
the published package, so that "works in React / Vue / Svelte" is something
CI proves rather than something the README says.

Each example covers, on purpose:

- **A validated form** — `z-input`, `z-select`, `z-checkbox` and a submit
  `z-button` inside a plain `<form>`, with `is-required` doing the blocking
  and `new FormData(form)` reading the answer. No framework form library.
- **A rich property** — `z-select`'s `options` array, set as a property,
  not an attribute.
- **A custom event** — `z-input`'s `change`, with its `detail`, handled
  through the framework's own event syntax.
- **SSR** (React only) — `renderToString` on the server and `hydrateRoot`
  on the client. The zest bundle needs DOM globals and cannot be imported
  in Node, so the server renders the tags and the elements upgrade in the
  browser. There is no declarative-shadow-DOM output yet.

They depend on the package through `file:../..`, so `npm run build` at the
root must have produced `dist/` first. `examples:smoke` then drives each
built app through the flow in a real browser and fails on any page error.

```bash
npm run build
npm run examples:build
npm run examples:smoke
```

## What the examples found

- **React 19 drops properties and listeners on hydration.** On a client
  render React sets `options` as a property and `onchange` as a listener.
  On hydration its custom-element path only diffs attributes; neither is
  applied. The React example binds both through ref callbacks, which do run
  during hydration. Anything a server can express — `name`, `type`,
  `is-required` — is safe as a plain attribute.
- **`type` on `z-button` is a property, not a reflected attribute**, so a
  framework that prefers properties leaves no `type="submit"` in the DOM.
  Selectors and CSS that key on it will miss. Worth reflecting in Phase 4.
- **Vue needs `isCustomElement`** for `z-*`, and `.prop` makes the rich
  binding explicit. Svelte 5 and Vue both pick property-over-attribute on
  their own once the element is upgraded.
