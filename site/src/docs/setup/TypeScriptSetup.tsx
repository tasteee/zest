import { Link } from 'wouter'
import { Article, Code, RefTable } from '@app/docs/Prose'

export const TypeScriptSetup = () => (
	<Article
		eyebrow="Configuration"
		title="TypeScript"
		lede="Zest works without any TypeScript setup. The one line below is optional: it makes React type-check the z elements."
	>
		<h2>Do I need this?</h2>
		<RefTable
			head={['Your setup', 'Required?', 'What it adds']}
			rows={[
				['Plain HTML or JavaScript', 'No', 'Nothing. There is no JSX to type.'],
				['Vue or Svelte', 'No', 'Nothing. Both treat z elements as ordinary DOM.'],
				['React + TypeScript', 'No, but recommended', 'Autocomplete, and wrong values become compile errors.'],
				['React without it', 'Compile error', 'TypeScript rejects every unknown z-* tag in JSX.'],
				['Solid + TypeScript', 'Same as React', 'Declare the elements yourself (see below).']
			]}
		/>
		<p>
			Nothing here affects runtime. Skipping it never breaks the elements. It only decides whether TypeScript knows they
			exist.
		</p>

		<h2>React</h2>
		<p>
			TypeScript does not know about custom tags, so a bare <code>&lt;z-button&gt;</code> in a <code>.tsx</code> file fails
			to compile. Reference the typings once, in any <code>.d.ts</code> file your project includes. Every <code>z-*</code>{' '}
			element then type-checks with its real props.
		</p>
		<Code
			language="ts"
			filename="src/zest.d.ts"
			code={`/// <reference types="@tasteee/zest/react" />`}
		/>
		<p>Or list it in <code>tsconfig.json</code> instead:</p>
		<Code
			language="json"
			filename="tsconfig.json"
			code={`{
  "compilerOptions": {
    "types": ["@tasteee/zest/react"]
  }
}`}
		/>
		<Code
			language="tsx"
			filename="App.tsx"
			code={`import '@tasteee/zest'
import '@tasteee/zest/ink.css'

export const App = () => (
  <>
    <z-button kind="solid" tone="primary">Save</z-button>
    <z-switch label="Dark mode" onchange={(event) => console.log(event.detail.checked)} />
    <z-button kind="huge">Error: "huge" is not a kind</z-button>
  </>
)`}
		/>
		<p>
			Props are the element’s attributes in camelCase (<code>isOpen</code>, not <code>is-open</code>). Events are lowercase
			handlers named after the event: <code>onchange</code>, <code>onselect</code>, and the event's{' '}
			<code>detail</code> is typed. The typings are generated from the package's own manifest, so they never name a prop the
			element does not have.
		</p>

		<h2>Vue and Svelte</h2>
		<p>
			No typings needed. Vue does need <code>isCustomElement</code> to stop it resolving <code>z-</code> tags as components;
			that is a compiler setting, not a type. See <Link href="/setup/vue">Vue</Link> and <Link href="/setup/svelte">Svelte</Link>.
		</p>

		<h2>Solid</h2>
		<p>
			Zest ships no Solid typings. Without them, TypeScript flags every z tag. To opt in, declare only the tags you use.
			This is optional, and it is hand-written, so it will not catch a wrong prop.
		</p>
		<Code
			language="ts"
			filename="src/zest-solid.d.ts"
			code={`
import 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'z-button': JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>
      'z-sidebar': JSX.HTMLAttributes<HTMLElement> & Record<string, unknown>
    }
  }
}
`}
		/>

		<h2>The rest of the API</h2>
		<p>
			The <code>toaster</code> API and option types (<code>ToastOptionsT</code>, <code>HideToastT</code>) are exported from
			the package root.
		</p>
	</Article>
)
