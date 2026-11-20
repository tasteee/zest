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
		<Code code={`<z-button kind="outline" tone="secondary" is-loading>Saving</z-button>`} />

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
		<p>
			Pass a lowercase handler named after the event: <code>onchange</code>, <code>onselect</code>. React 19 adds it as a
			real event listener on the element, so the handler gets the element’s own <code>CustomEvent</code> and reads the
			payload from <code>event.detail</code>.
		</p>
		<Code
			language="tsx"
			filename="StylePicker.tsx"
			code={`
import { useState } from 'react'
import '@tasteee/zest'

const styleOptions = [
  { value: 'calm', label: 'Calm' },
  { value: 'electric', label: 'Electric' }
]

export const StylePicker = () => {
  const [selectedStyle, setSelectedStyle] = useState('electric')

  const handleChange = (event: CustomEvent<{ value: string }>) => setSelectedStyle(event.detail.value)

  return <z-select value={selectedStyle} options={styleOptions} onchange={handleChange} />
}
`}
		/>
		<p>
			Keep it lowercase. <code>onChange</code> and <code>onSelect</code> are React’s own synthetic events: they wrap the
			event, so <code>detail</code> is only reachable through <code>event.nativeEvent</code>.
		</p>
		<p>
			On React 18 and older, custom elements get no event props at all. Attach the listener with a ref and{' '}
			<code>addEventListener</code> instead.
		</p>

		<h2>Types</h2>
		<p>
			See <Link href="/guide/typescript">TypeScript</Link> for declaring the z elements as JSX intrinsic elements.
		</p>
	</Article>
)

export const UsageSvelte = () => (
	<Article
		eyebrow="Usage"
		title="Svelte"
		lede="Svelte 5 passes props straight to custom elements, so arrays, objects, and events work without wrappers."
	>
		<Code
			language="svelte"
			filename="Inbox.svelte"
			code={`
<script lang="ts">
  import '@tasteee/zest'

  const items = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'drafts', label: 'Drafts' }
  ]

  let value = $state('inbox')

  const handleSelect = (event: CustomEvent<{ value: string }>) => (value = event.detail.value)
</script>

<z-sidebar {items} {value} onselect={handleSelect}></z-sidebar>
<z-button kind="outline" is-loading>Saving</z-button>
`}
		/>

		<h2>Props</h2>
		<p>
			Write fixed options as ordinary kebab-case attributes, exactly as in HTML. For anything dynamic, use the element’s
			camelCase property name: <code>items={'{items}'}</code>, <code>isOpen={'{isOpen}'}</code>. When the element has a
			property by that name, Svelte sets the property, so arrays and objects such as <code>items</code> or{' '}
			<code>options</code> arrive intact. A kebab-case name like <code>is-open</code> has no matching property, so Svelte
			writes it as an attribute instead: fine for strings and booleans, but an array would arrive as text.
		</p>
		<p>
			Import <code>@tasteee/zest</code> before the component mounts. Svelte only sees an element’s properties once the
			element is registered.
		</p>

		<h2>Events</h2>
		<p>
			Listen with an event attribute named after the event: <code>onselect</code>, <code>onchange</code>,{' '}
			<code>onlinkclick</code>. Read the payload from <code>event.detail</code>.
		</p>

		<h2>Types</h2>
		<p>
			See <Link href="/guide/typescript">TypeScript</Link> for typing the z elements in a Svelte project.
		</p>
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
		<Code
			language="vue"
			filename="Inbox.vue"
			code={`
<script setup lang="ts">
import '@tasteee/zest'
import { ref } from 'vue'

const items = [
  { value: 'inbox', label: 'Inbox' },
  { value: 'drafts', label: 'Drafts' }
]

const value = ref('inbox')

const handleSelect = (event: CustomEvent<{ value: string }>) => {
  value.value = event.detail.value
}
</script>

<template>
  <z-sidebar :value="value" :items="items" @select="handleSelect"></z-sidebar>
  <z-button kind="outline" is-loading>Saving</z-button>
</template>
`}
		/>

		<h2>Props</h2>
		<p>
			Write fixed options as ordinary kebab-case attributes, exactly as in HTML. Bind dynamic values with the element’s
			camelCase property name: <code>:items</code>, <code>:isOpen</code>. When the element has a property by that name, Vue
			sets the property, so arrays and objects arrive intact. A kebab-case binding like <code>:is-open</code> has no
			matching property, so Vue writes it as an attribute instead: fine for strings and booleans, but an array would arrive
			as <code>[object Object]</code>.
		</p>
		<p>
			Import <code>@tasteee/zest</code> before the app mounts. Vue only sees an element’s properties once the element is
			registered. To force a property either way, add the <code>.prop</code> modifier: <code>:items.prop="items"</code>.
		</p>

		<h2>Events</h2>
		<p>
			Listen with <code>@</code> and the event’s name: <code>@select</code>, <code>@change</code>,{' '}
			<code>@linkclick</code>. Read the payload from <code>event.detail</code>.
		</p>
	</Article>
)

export const UsageSolid = () => (
	<Article
		eyebrow="Usage"
		title="Solid"
		lede="Solid renders custom elements as plain DOM, so every z element works without wrappers. The patterns below work the same in Solid 1 and Solid 2."
	>
		<h2>Usage</h2>
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

  const handleSelect = (event: CustomEvent<{ value: string }>) => {
    setValue(event.detail.value)
  }

  return (
    <>
      <z-sidebar prop:value={value()} prop:items={items} onSelect={handleSelect} />
      <z-button kind="outline" is-loading="">Saving</z-button>
    </>
  )
}
`}
		/>

		<h2>Props</h2>
		<p>
			Write fixed options as plain string attributes in kebab-case, exactly as in HTML: <code>kind="outline"</code>,{' '}
			<code>is-loading=""</code>. Pass anything dynamic, and every array or object, with <code>prop:</code> and the
			element’s camelCase property name: <code>prop:items</code>, <code>prop:isOpen</code>.
		</p>
		<p>
			Without <code>prop:</code>, the two versions go wrong in different ways. Solid 1 lowercases the name
			(<code>isOpen</code> becomes <code>isopen</code>, which the element doesn’t have). Solid 2 writes the value as an
			attribute, so an array arrives as text. Solid 2 also removed the <code>attr:</code> prefix, so plain strings are the
			way to write attributes.
		</p>

		<h2>Events</h2>
		<p>
			Use a camelCase handler: <code>onSelect</code>, <code>onChange</code>, <code>onLinkClick</code>. Solid lowercases the
			name, so these listen for <code>select</code>, <code>change</code>, and <code>linkclick</code>, and the handler
			receives the element’s own event. Read the payload from <code>event.detail</code>. Solid 2 removed the{' '}
			<code>on:</code> prefix.
		</p>

		<h2>Types</h2>
		<p>
			Solid does not ship typings from Zest. See <Link href="/guide/typescript">TypeScript</Link> for an optional snippet
			that declares the elements.
		</p>
	</Article>
)
