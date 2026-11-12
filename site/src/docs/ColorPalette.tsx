import { useState } from 'react'
import './ColorPalette.css'

const shadeSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const colorRoles = ['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger'] as const

type ColorRoleT = (typeof colorRoles)[number]
type PaletteColorsT = Record<ColorRoleT, string>

export const ColorPalette = () => {
	const [colors, setColors] = useState<PaletteColorsT>({ primary: '#e2e9e3', secondary: '#9964dd', tertiary: '#e45785', neutral: '#a5aea7', success: '#2fa75b', warning: '#e7a800', danger: '#ef5555' })

	const handleColorChange = (role: ColorRoleT, color: string) => {
		const nextColors = { ...colors, [role]: color }
		setColors(nextColors)
		document.documentElement.style.setProperty(`--palette-${role}`, color)
		document.documentElement.setAttribute(`data-palette-${role}`, '')
	}

	return (
		<details className="colorPalette">
			<summary className="DocsIconButton" aria-label="Customize colors" title="Customize colors">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
					<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.4-3.4 2 2 0 0 1 1.4-3.4H18a3 3 0 0 0 3-3C21 6.7 17 3 12 3Z" />
					<circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="14.5" cy="7.5" r="1" />
				</svg>
			</summary>
			<div className="colorPalettePanel">
				<strong>Theme colors</strong>
				<p>Colors adapt to the current light or dark theme.</p>
				{colorRoles.map((role) => {
					const color = colors[role]
					const isStatus = role === 'success' || role === 'warning' || role === 'danger'
					const token = isStatus ? `--status-${role}` : `--accent-${role}`
					return (
						<div className="colorPaletteRole" key={role}>
							<label className="colorPaletteLabel">{role}<input type="color" value={color} onChange={(event) => { handleColorChange(role, event.currentTarget.value) }} /></label>
							<div className="colorPaletteScale" aria-label={`${role} color scale`}>
								{shadeSteps.map((step) => {
									const isDarkStep = step < 5
									const percentage = isDarkStep ? step * 20 : (9 - step) * 25
									const endpoint = isDarkStep ? 'black' : 'white'
									const blendedColor = `color-mix(in oklab, var(${token}) ${percentage}%, ${endpoint})`
									const background = role === 'neutral' ? `var(--color-neutral-${step})` : blendedColor
									return <span key={step} title={`Step ${step}`} style={{ background }} />
								})}
							</div>
						</div>
					)
				})}
			</div>
		</details>
	)
}
