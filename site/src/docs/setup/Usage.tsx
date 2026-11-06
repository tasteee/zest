import { Link } from 'wouter'
import { Article, Code } from '@app/docs/Prose'

export const UsageHtml = () => (
	<Article
		eyebrow="Usage"
		title="Plain HTML"
		lede="Zest elements are ordinary HTML elements. Attributes configure them, content goes inside, and events report back."
	>
		<h2>Attributes</h2>
		<p>
			Every option is an attribute in kebab-case. Boolean options are present or absent: <code>is-disabled</code>,{' '}
			<code>is-open</code>.
		</p>
		<Code code={`<z-button kind="outline" tone="primary" is-loading>Saving</z-button>`} />

		<h2>Content: slots and child elements</h2>
		<p>
			Content goes inside the element. Named slots place it (<code>slot="trigger"</code>, <code>slot="footer"</code>); list
			elements take declarative children, so a menu needs no JavaScript at all.
		</p>
		<Code
			code={`
<z-menu>
  <z-button slot="trigger" kind="outline">Actions</z-button>
  <z-menu-item value="rename" shortcut="⌘R">Rename</z-menu-item>
  <z-menu-separator></z-menu-separator>
  <z-menu-item value="delete" is-danger>Delete</z-menu-item>
</z-menu>
`}
		/>

		<h2>Arrays and objects</h2>
		<p>Attributes in HTML are strings, so data like arrays and objects is assigned from JavaScript instead. The name is the camelCase version of the attribute.</p>
		<Code
			language="js"
			code={`
const sidebar = document.querySelector('z-sidebar')
sidebar.items = [{ value: 'inbox', label: 'Inbox' }, { value: 'drafts', label: 'Drafts' }]
`}
		/>

		<h2>Events</h2>
		<p>
			Elements dispatch DOM events with a <code>detail</code> payload. They bubble and cross shadow boundaries.
		</p>
		<Code
			language="js"
			code={`
document.querySelector('z-menu').addEventListener('select', (event) => {
  console.log(event.detail.value)
})
`}
		/>
	</Article>
)

export const UsageReact = () => (
	<Article
		eyebrow="Usage"
		title="React"
		lede="React 19 supports custom elements natively: camelCase props map to the element’s attributes, and arrays and objects pass straight through."
	>
		<h2>Props</h2>
		<p>
			Write options in camelCase. React hands them to the element as-is, so array-valued options like{' '}
			<code>items</code> arrive intact. Here the component gets <code>route</code> and <code>saving</code> from its
			props and passes them straight on.
		</p>
		<Code
			language="tsx"
			filename="Inbox.tsx"
			code={`
import '@tasteee/zest'

type InboxPropsT = {
  route: string
  saving: boolean
}

const items = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'sent', label: 'Sent' }
]

export const Inbox = (props: InboxPropsT) => {
  return (
    <>
      <z-sidebar value={props.route} items={items} />
      <z-button kind="outline" isLoading={props.saving}>
        Save
      </z-button>
    </>
  )
}
`}
		/>

		<h2>Events</h2>
		<p>Listen with a ref, which works for every event name in every React version.</p>
		<Code
			language="tsx"
			code={`
const ref = useRef<HTMLElement>(null)

useEffect(() => {
  const menu = ref.current
  const onSelect = (event: Event) => run((event as CustomEvent).detail.value)
  menu?.addEventListener('select', onSelect)
  return () => menu?.removeEventListener('select', onSelect)
}, [])

return <z-menu ref={ref}>…</z-menu>
`}
		/>

		<h2>Types</h2>
		<p>
			See <Link href="/setup/typescript">TypeScript</Link> for declaring the z elements as JSX intrinsic elements.
		</p>
	</Article>
)

export const UsageSvelte = () => (
	<Article
		eyebrow="Usage"
		title="Svelte"
		lede="Svelte passes props straight to custom elements, so arrays, objects, and events work without wrappers."
	>
		<Code
			language="html"
			filename="Inbox.svelte"
			code={`
<script>
  import '@tasteee/zest'
  let value = 'inbox'
  const items = [{ value: 'inbox', label: 'Inbox' }, { value: 'drafts', label: 'Drafts' }]
</script>

<z-sidebar {items} {value} on:select={(event) => (value = event.detail.value)} />
`}
		/>
	</Article>
)

export const UsageVue = () => (
	<Article
		eyebrow="Usage"
		title="Vue"
		lede="Vue 3 renders custom elements natively. Tell the compiler which tags are custom elements, then use them like any other element."
	>
		<h2>Setup</h2>
		<p>
			Without this, Vue tries to resolve <code>z-button</code> as a Vue component and warns. Mark every <code>z-</code> tag
			as a custom element.
		</p>
		<Code
			language="ts"
			filename="vite.config.ts"
			code={`
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('z-')
        }
      }
    })
  ]
}
`}
		/>

		<h2>Usage</h2>
		<p>
			Import the package once. Attributes are kebab-case, <code>:items</code> binds arrays and objects, and{' '}
			<code>@select</code> listens for events. Read the payload from <code>event.detail</code>.
		</p>
		<Code
			language="html"
			filename="Inbox.vue"
			code={`
<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const value = ref('inbox')
const items = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'drafts', label: 'Drafts' }
]

const handleSelect = (event: CustomEvent) => {
  value.value = event.detail.value
}
</script>

<template>
  <z-sidebar :value="value" :items="items" @select="handleSelect" />
  <z-button kind="outline" is-loading>Saving</z-button>
</template>
`}
		/>
		<p>
			If an array or object ever lands in the DOM as <code>[object Object]</code>, add the <code>.prop</code> modifier:{' '}
			<code>:items.prop="items"</code>.
		</p>
	</Article>
)

export const UsageSolid = () => (
	<Article
		eyebrow="Usage"
		title="Solid"
		lede="Solid renders custom elements as plain DOM, so every z element works without wrappers. It has two prefixes for the cases that matter."
	>
		<h2>Usage</h2>
		<p>
			Import the package once. Use <code>attr:</code> for kebab-case attributes, <code>prop:</code> for arrays and
			objects, and <code>on:</code> for events. <code>on:</code> keeps the event name exactly as dispatched.
		</p>
		<Code
			language="tsx"
			filename="Inbox.tsx"
			code={`
import '@tasteee/zest'
import { createSignal } from 'solid-js'

const items = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'drafts', label: 'Drafts' }
]

export const Inbox = () => {
  const [value, setValue] = createSignal('inbox')

  const handleSelect = (event: CustomEvent) => {
    setValue(event.detail.value)
  }

  return (
    <>
      <z-sidebar attr:value={value()} prop:items={items} on:select={handleSelect} />
      <z-button attr:kind="outline" attr:is-loading="">Saving</z-button>
    </>
  )
}
`}
		/>

		<h2>Types</h2>
		<p>
			Solid does not ship typings from Zest. See <Link href="/setup/typescript">TypeScript</Link> for an optional snippet
			that declares the elements.
		</p>
	</Article>
)
