import { describe, expect, it } from 'vitest'
import { getAllComponentDocTags, getComponentDoc } from '../../site/src/component-docs/registry'
import { ComponentStatus, isStableEvidence } from '../../site/src/component-docs/types'

// A page may call itself stable only with every evidence row green. This is
// the line between "stable" as a demonstrated standard and "stable" as a
// mood; see docs/production-readiness-plan.md, Phase 0.
describe('component status is earned', () => {
	const tags = getAllComponentDocTags()

	it('has authored pages to check', () => {
		expect(tags.length).toBeGreaterThan(0)
	})

	it.each(tags)('<%s> does not claim stable without the evidence', (tag) => {
		const doc = getComponentDoc(tag)!
		if (doc.status === ComponentStatus.stable) expect(isStableEvidence(doc.evidence)).toBe(true)
	})
})
