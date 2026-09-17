import { describe, expect, expectTypeOf, it } from 'vitest'
import { ZButton } from '../components/z-button'
import { ZDialog } from '../components/z-dialog'
import { ZInput } from '../components/z-input'
import { ZSelect } from '../components/z-select'
import { ZToast } from '../components/z-toast'
import { ZTooltip } from '../components/z-tooltip'

/*
 * The declared types are the contract a TypeScript consumer gets. These
 * assertions are checked by `npm run typecheck`, not at runtime — a widened
 * prop is a compile error here, which is the whole point.
 */

type PropsOf<Element extends abstract new () => unknown> = InstanceType<Element>

describe('declared prop types are the documented unions', () => {
	it('z-button', () => {
		expectTypeOf<PropsOf<typeof ZButton>['size']>().toEqualTypeOf<'sm' | 'md' | 'lg' | undefined>()
		expectTypeOf<PropsOf<typeof ZButton>['kind']>().toEqualTypeOf<'solid' | 'outline' | 'ghost' | 'soft' | 'plain' | undefined>()
		expectTypeOf<PropsOf<typeof ZButton>['type']>().toEqualTypeOf<'button' | 'submit' | 'reset' | undefined>()
		// @ts-expect-error — "huge" is not a size
		const wrong: PropsOf<typeof ZButton>['size'] = 'huge'
		expect(wrong).toBe('huge')
	})

	it('z-input', () => {
		expectTypeOf<PropsOf<typeof ZInput>['accent']>().toEqualTypeOf<'neutral' | 'dom' | 'sub' | undefined>()
	})

	it('z-select', () => {
		expectTypeOf<PropsOf<typeof ZSelect>['size']>().toEqualTypeOf<'sm' | 'md' | 'lg' | undefined>()
	})

	it('z-dialog', () => {
		expectTypeOf<PropsOf<typeof ZDialog>['size']>().toEqualTypeOf<'sm' | 'md' | 'lg' | undefined>()
	})

	it('z-toast', () => {
		expectTypeOf<PropsOf<typeof ZToast>['position']>().toEqualTypeOf<'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end' | undefined>()
	})

	it('z-tooltip', () => {
		expectTypeOf<PropsOf<typeof ZTooltip>['placement']>().toMatchTypeOf<string | undefined>()
		// @ts-expect-error — "middle" is not a placement
		const wrong: PropsOf<typeof ZTooltip>['placement'] = 'middle'
		expect(wrong).toBe('middle')
	})
})
