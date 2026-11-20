import { type as atomicoType } from 'atomico'

/*
 * Narrow string props.
 *
 * Atomico types a `{ type: String }` prop as `string`, so the declaration
 * file a consumer reads says `size: string` where the docs say
 * `sm | md | lg`, and `size="huge"` typechecks. `oneOf` keeps the runtime
 * exactly what `String` was — Atomico's `type()` is the identity — and makes
 * the declared type the literal union. scripts/build-cem.mjs reads the same
 * call, so the manifest carries the union too, and the API contract test
 * holds the two to each other.
 */
export const oneOf = <const Values extends readonly [string, ...string[]]>(...values: Values) =>
	atomicoType<Values[number]>(String)

/*
 * Typed array props.
 *
 * `{ type: Array }` reaches the declaration file and the JSX types as
 * `unknown`. `listOf<string>()` is still plain Array at runtime, but the
 * declared type is string[], and scripts/build-cem.mjs reads the type
 * argument, so the manifest and the React typings say string[] too.
 */
export const listOf = <Item>() => atomicoType<Item[]>(Array)
