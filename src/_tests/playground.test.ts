import { describe, expect, it, vi } from 'vitest'
import '../components/z-playground'
import '../components/z-control-panel'
import '../components/z-field'
import '../components/z-switch'
import '../components/z-input'
import '../components/z-number-input'
import '../components/z-select'
import '../components/z-code-block'
import '../components/z-dialog'
import { getShadowRoot, waitForRender } from './test-helpers'
import { getComponentPlaygroundData } from '../../site/src/docs-data'

const settle = async () => { await waitForRender(); await waitForRender() }
const mount = async (html: string, controls: unknown[], props = {}) => {
 const el = document.createElement('z-playground')
 Object.assign(el, { controls, ...props })
 el.innerHTML = html
 document.body.append(el)
 await settle()
 return el
}
const code = (el: HTMLElement) => (getShadowRoot(el).querySelector('z-code-block') as HTMLElement & { code: string }).code
const change = async (el: HTMLElement, name: string, value: unknown) => {
 getShadowRoot(el).querySelector<HTMLElement>('z-control-panel')!.dispatchEvent(new CustomEvent('change', { detail: { name, value } }))
 await settle()
}

describe('playground contracts', () => {
 it('splits grouped Markdown attributes into independently usable knobs', () => {
  const data = getComponentPlaygroundData('## Attributes\n\n| Name | Type | Default | Description |\n| --- | --- | --- | --- |\n| `min` / `max` | number | — | Bounds |\n| `is-disabled` / `is-readonly` | boolean | — | States |')
  expect(data.controls.map(control => control.name)).toEqual(['min', 'max', 'is-disabled', 'is-readonly'])
 })
 it('preserves mixed text, escaped attribute values, and literal text on copy', async () => {
  const el = await mount('<div slot="stage" title="&quot;&amp;&lt;">Before <b>bold</b> after &lt;example&gt;</div>', [])
  const template = document.createElement('template')
  template.innerHTML = code(el)
  expect(template.content.firstElementChild?.getAttribute('title')).toBe('"&<')
  expect(template.content.textContent).toBe('Before bold after <example>')
  expect(code(el)).not.toContain('slot="stage"')
 })
 it('tracks live stage mutations and clears stale output when removed', async () => {
  const el = await mount('<div slot="stage">Before</div>', [{ name: 'title', kind: 'text' }])
  el.firstElementChild!.setAttribute('title', 'Updated')
  el.firstElementChild!.textContent = 'After'
  await settle()
  expect(code(el)).toContain('title="Updated"')
  expect(code(el)).toContain('After')
  el.replaceChildren()
  await settle()
  expect(code(el)).toBe('')
 })
 it('resets the controlled child rather than copying wrapper attributes', async () => {
  const el = await mount('<div slot="stage" title="Wrapper"><span title="Original">Text</span></div>', [{ name: 'title', kind: 'text' }], { tagName: 'span', authoredAttributeValues: { title: 'Wrapper' } })
  await change(el, 'title', 'Changed')
  expect(el.querySelector('span')?.getAttribute('title')).toBe('Changed')
  getShadowRoot(el).querySelector<HTMLButtonElement>('.reset')!.click()
  await settle()
  expect(el.querySelector('span')?.getAttribute('title')).toBe('Original')
 })
 it('represents a default-on boolean and provides JavaScript for disabling it', async () => {
  const el = await mount('<z-dialog slot="stage" heading="Demo"></z-dialog>', [{ name: 'has-close', kind: 'boolean', defaultValue: 'true' }], { tagName: 'z-dialog', authoredAttributeValues: { heading: 'Demo' } })
  const panel = getShadowRoot(el).querySelector<HTMLElement>('z-control-panel') as HTMLElement & { values: Record<string, string> }
  expect(panel.values).toHaveProperty('has-close')
  await change(el, 'has-close', null)
  expect(panel.values).not.toHaveProperty('has-close')
  const blocks = getShadowRoot(el).querySelectorAll('z-code-block')
  expect((blocks[1] as HTMLElement & { code: string }).code).toContain('.hasClose = false')
  getShadowRoot(el).querySelector<HTMLButtonElement>('.reset')!.click()
  await settle()
  expect(panel.values).toHaveProperty('has-close')
  expect(getShadowRoot(el).querySelectorAll('z-code-block')).toHaveLength(1)
 })
 it('commits numeric steppers and ignores incomplete numeric input', async () => {
  const panel = document.createElement('z-control-panel')
  Object.assign(panel, { controls: [{ name: 'count', kind: 'number' }], values: { count: '2' } })
  const listener = vi.fn()
  panel.addEventListener('change', listener)
  document.body.append(panel)
  await settle()
  const number = getShadowRoot(panel).querySelector<HTMLElement>('z-number-input')!
  getShadowRoot(number).querySelector<HTMLButtonElement>('button[aria-label="Increase value"]')!.click()
  await settle()
  expect(listener.mock.calls.at(-1)?.[0].detail).toEqual({ name: 'count', value: '3' })
  listener.mockClear()
  number.dispatchEvent(new CustomEvent('input', { detail: { value: null, rawValue: '-' } }))
  expect(listener).not.toHaveBeenCalled()
 })
 it('uses placeholders for defaults so clearing a text knob stays cleared', async () => {
  const el = await mount('<div slot="stage" title="Custom"></div>', [{ name: 'title', kind: 'text', defaultValue: 'Default' }])
  await change(el, 'title', null)
  const panel = getShadowRoot(el).querySelector<HTMLElement>('z-control-panel')!
  const field = getShadowRoot(panel).querySelector<HTMLElement>('z-input')!
  const input = getShadowRoot(field).querySelector('input')!
  expect(input.value).toBe('')
  expect(input.placeholder).toBe('Default')
 })
})
