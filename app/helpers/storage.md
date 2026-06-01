# storage

`storage` is a small browser storage helper that lets application code read, write, and delete `localStorage` and `sessionStorage` values through property access.

It stores values in a readable browser storage format and keeps type information in one metadata key so values can be read back with the expected type.

## Import

```ts
import { storage } from '#platform/storage'
```

## Local Storage

Use `storage.local` for `window.localStorage`.

```ts
storage.local.theme = 'dark'
storage.local.count = 3
storage.local.settings = { isCompact: true }

const theme = storage.local.theme
const count = storage.local.count
const settings = storage.local.settings
```

Values written through `storage.local` are stored in `localStorage` and remain available across browser sessions.

## Session Storage

Use `storage.session` for `window.sessionStorage`.

```ts
storage.session.currentStep = 'billing'
storage.session.formDraft = { email: 'person@example.com' }

const currentStep = storage.session.currentStep
const formDraft = storage.session.formDraft
```

Values written through `storage.session` are stored in `sessionStorage` and last for the current browser tab session.

## Scoped Storage

Use `storage.scoped(scope)` to prefix every key with a scope name.

```ts
const checkoutStorage = storage.scoped('checkout')

checkoutStorage.local.cartId = 'cart_123'
checkoutStorage.session.step = 'payment'

const cartId = checkoutStorage.local.cartId
const step = checkoutStorage.session.step
```

The actual browser storage keys become `checkout:cartId` and `checkout:step`.

Scopes are useful when a feature owns several storage keys and should avoid collisions with other features.

## Deleting Values

Use the `delete` operator to remove a stored value.

```ts
storage.local.theme = 'dark'
delete storage.local.theme

storage.session.currentStep = 'billing'
delete storage.session.currentStep
```

Deleting a scoped value removes the scoped key.

```ts
const checkoutStorage = storage.scoped('checkout')

checkoutStorage.local.cartId = 'cart_123'
delete checkoutStorage.local.cartId
```

## Missing Values

If a key is missing, the helper returns `undefined`.

```ts
const missingValue = storage.local.notSetYet
```

## Supported Values

The helper is intended for values that can safely live in browser storage:

```ts
storage.local.stringValue = 'pink'
storage.local.numberValue = 123
storage.local.booleanValue = true
storage.local.nullValue = null
storage.local.undefinedValue = undefined
storage.local.arrayValue = ['seattle', 'dallas']
storage.local.objectValue = { name: 'Baxter' }
storage.local.bigintValue = 123n
```

Top-level `bigint` values are stored as readable string values and read back as `bigint` values.

Setting a value to `undefined` removes the storage key.

Top-level `function` and `symbol` values are stored with `String(value)`.

Objects and arrays use JSON serialization. That means normal JSON rules still apply inside objects and arrays: circular references throw, nested `bigint` values throw, and nested functions or symbols are not preserved by JSON.

## Stored Format

Values are stored directly in browser storage. Type information is stored in one internal metadata key per storage area.

```ts
storage.local.theme = 'dark'
storage.local.count = 3
storage.local.settings = { isCompact: true }

localStorage.getItem('theme')
// dark

localStorage.getItem('count')
// 3

localStorage.getItem('settings')
// {"isCompact":true}

localStorage.getItem('__zesty_storage_types__')
// {"theme":"string","count":"number","settings":"json"}
```

Values without metadata are read as strings. This keeps manually added or manually edited browser storage values predictable.

The metadata key is internal. Read values back through `storage.local`, `storage.session`, or a scoped storage proxy.

## How It Works

`storage.local` and `storage.session` are JavaScript proxies.

When a property is set, the proxy converts the property name into a storage key, serializes the value into a readable browser storage string, writes it with `setItem`, and updates the metadata key.

When a property is read, the proxy reads the matching browser storage key with `getItem`, checks the metadata key, deserializes the stored value, and returns the expected value type.

When a property is deleted, the proxy removes the matching browser storage key with `removeItem` and removes its metadata entry.
