import { describe, expect, it } from 'vitest'
import { getAllComponentDocTags, getComponentDoc } from '../../../site/src/component-docs/registry'
import { runDocVerification } from '../../../site/src/verify-docs'
import { settle } from './form-helpers'
import { expectNoA11yViolations } from './a11y-helpers'
import '../../../site/src/internal-doc-elements'

/*
 * The documentation, run. Every authored page renders and every example
 * builds real DOM (verify-docs); every example that makes a claim about
 * behaviour proves it through its `assert`; and every example on a core
 * page passes axe once mounted. A doc that stops being true fails here.
 */

const core = new Set(['z-button', 'z-button-group', 'z-input', 'z-textarea', 'z-number-input', 'z-checkbox', 'z-switch', 'z-radio-group', 'z-select', 'z-combobox', 'z-field', 'z-dialog', 'z-popover', 'z-tooltip', 'z-toast', 'z-alert'])

describe('component docs', () => {
	it('every page renders and every example builds', () => {
		const result = runDocVerification(new Set())
		expect(result.pageCount).toBeGreaterThan(0)
		expect(result.exampleCount).toBeGreaterThan(0)
		expect(result.problems.map((problem) => `${problem.scope}: ${problem.message}`)).toEqual([])
	})

	const claims = getAllComponentDocTags().flatMap((tag) =>
		(getComponentDoc(tag)?.examples ?? []).filter((example) => example.assert).map((example) => [tag, example.id, example] as const)
	)

	it('has examples that assert what they claim', () => {
		expect(claims.length).toBeGreaterThan(0)
	})

	it.each(claims)('<%s> › %s does what it says', async (_tag, _id, example) => {
		const preview = example.buildPreview()
		document.body.append(preview)
		await settle(preview)
		await example.assert!(preview)
	})

	const coreExamples = [...core].flatMap((tag) => (getComponentDoc(tag)?.examples ?? []).map((example) => [tag, example.id, example] as const))

	it.each(coreExamples)('<%s> › %s passes axe once mounted', async (_tag, _id, example) => {
		const preview = example.buildPreview()
		document.body.append(preview)
		await settle(preview)
		await expectNoA11yViolations(preview)
	})
})
