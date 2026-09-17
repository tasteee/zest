import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { englishStrings } from '../shared/locale'

// Every string zest can say is listed in docs/fundamentals/internationalization.md.
describe('locale keys are documented', () => {
	const doc = readFileSync(join(__dirname, '..', '..', 'docs', 'fundamentals', 'internationalization.md'), 'utf8')

	it.each(Object.keys(englishStrings))('%s', (key) => {
		expect(doc).toContain(`\`${key}\``)
	})
})
