import { useEffect, useState } from 'react'
import { PALETTE_RESET_EVENT } from '@app/docs/palette-storage'

const PALETTE_ATTRIBUTE_PREFIX = 'data-palette-'

const getCustomizedRoles = (): string[] => {
	const attributeNames = document.documentElement.getAttributeNames()
	const paletteNames = attributeNames.filter((name) => name.startsWith(PALETTE_ATTRIBUTE_PREFIX))
	return paletteNames.map((name) => name.slice(PALETTE_ATTRIBUTE_PREFIX.length))
}

// Colors shown on a docs page come from live tokens, so changing them in the
// Settings dropdown repaints every swatch. This tells the reader when that has
// happened, so a customized color is never mistaken for the shipped one. It
// sticks under the top bar so it stays in view while the page scrolls.
export const PaletteNotice = () => {
	const [customizedRoles, setCustomizedRoles] = useState<string[]>(getCustomizedRoles)

	useEffect(() => {
		const observer = new MutationObserver(() => setCustomizedRoles(getCustomizedRoles()))
		observer.observe(document.documentElement, { attributes: true })
		return () => observer.disconnect()
	}, [])

	const handleReset = () => window.dispatchEvent(new CustomEvent(PALETTE_RESET_EVENT))

	const isCustomized = customizedRoles.length > 0
	if (!isCustomized) return null

	const roleList = customizedRoles.join(', ')

	return (
		<div className="PaletteNoticeBar">
			<z-callout tone="warning" heading="Showing your custom colors">
				The colors on this page are not the originals. You changed <strong>{roleList}</strong> in the Settings dropdown, and every swatch here
				follows those choices.{' '}
				<button type="button" className="PaletteNoticeReset" onClick={handleReset}>
					Reset to the original colors
				</button>
			</z-callout>
		</div>
	)
}
