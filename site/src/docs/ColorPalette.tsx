import { useEffect, useRef, useState } from 'react'
import { toaster } from '@tasteee/zest'
import { ScaleControl } from '@app/docs/ScaleControl'
import { FrameworkSelect } from '@app/docs/frameworks/FrameworkPicker'
import {
	COLOR_ROLES,
	DEFAULT_COLORS,
	PALETTE_RESET_EVENT,
	applyPaletteColor,
	clearPaletteColor,
	readStoredPalette,
	writeStoredPalette,
	type ColorRoleT,
	type CustomColorsT
} from '@app/docs/palette-storage'
import './ColorPalette.css'

const SHADE_STEPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const CUSTOM_THEME_TOAST_MS = 10000

const ResetIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
	</svg>
)

const SettingsIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
		<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
	</svg>
)

export const ColorPalette = () => {
	const [customColors, setCustomColors] = useState<CustomColorsT>(readStoredPalette)
	const detailsRef = useRef<HTMLDetailsElement>(null)

	const saveCustomColors = (nextColors: CustomColorsT) => {
		setCustomColors(nextColors)
		writeStoredPalette(nextColors)
	}

	const handleColorChange = (role: ColorRoleT, color: string) => {
		applyPaletteColor(role, color)
		saveCustomColors({ ...customColors, [role]: color })
	}

	const handleResetRole = (role: ColorRoleT) => {
		clearPaletteColor(role)
		const nextColors = { ...customColors }
		delete nextColors[role]
		saveCustomColors(nextColors)
	}

	const handleResetAll = () => {
		for (const role of COLOR_ROLES) clearPaletteColor(role)
		saveCustomColors({})
	}

	// the callout on each docs page also offers a reset
	useEffect(() => {
		window.addEventListener(PALETTE_RESET_EVENT, handleResetAll)
		return () => window.removeEventListener(PALETTE_RESET_EVENT, handleResetAll)
	}, [])

	// clicking anywhere outside the dropdown, or pressing Escape, closes it
	useEffect(() => {
		const closePanel = () => {
			const details = detailsRef.current
			if (details) details.open = false
		}
		const handlePointerDown = (event: PointerEvent) => {
			const details = detailsRef.current
			const isOpen = Boolean(details?.open)
			if (!isOpen) return
			const isInside = details?.contains(event.target as Node)
			if (isInside) return
			closePanel()
		}
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closePanel()
		}
		document.addEventListener('pointerdown', handlePointerDown)
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	// a returning visitor with saved colors is told, once, on load
	useEffect(() => {
		const savedRoles = Object.keys(readStoredPalette())
		const hasSavedColors = savedRoles.length > 0
		if (!hasSavedColors) return
		toaster.show({
			id: 'custom-theme-applied',
			tone: 'warning',
			title: 'Custom theme applied',
			description: 'These docs are using colors you changed in Settings, not the original ones.',
			duration: CUSTOM_THEME_TOAST_MS
		})
	}, [])

	const hasCustomColors = Object.keys(customColors).length > 0

	return (
		<details className="colorPalette" ref={detailsRef}>
			<summary className="DocsIconButton" aria-label="Settings" title="Settings">
				<SettingsIcon />
			</summary>
			<div className="colorPalettePanel">
				<strong className="colorPaletteSectionTitle">Theme</strong>
				<z-theme-switcher size="sm" />
				<hr className="colorPaletteDivider" />
				<strong className="colorPaletteSectionTitle">Code examples</strong>
				<FrameworkSelect />
				<p>Every example’s Code tab shows this framework.</p>
				<hr className="colorPaletteDivider" />
				<div className="colorPaletteHeader">
					<strong>Theme colors</strong>
					<button type="button" className="colorPaletteResetAll" disabled={!hasCustomColors} onClick={handleResetAll}>
						<ResetIcon />
						Reset colors
					</button>
				</div>
				<p>Colors adapt to the current light or dark theme.</p>
				{COLOR_ROLES.map((role) => {
					const customColor = customColors[role]
					const isCustomized = customColor !== undefined
					const color = customColor ?? DEFAULT_COLORS[role]
					return (
						<div className="colorPaletteRole" key={role}>
							<div className="colorPaletteLabel">
								<span className="colorPaletteRoleName">
									{role}
									{isCustomized && (
										<button
											type="button"
											className="colorPaletteResetRole"
											aria-label={`Reset ${role} color`}
											title={`Reset ${role} color`}
											onClick={() => handleResetRole(role)}
										>
											<ResetIcon />
										</button>
									)}
								</span>
								<input
									type="color"
									value={color}
									aria-label={`${role} color`}
									onChange={(event) => handleColorChange(role, event.currentTarget.value)}
								/>
							</div>
							<div className="colorPaletteScale" aria-label={`${role} color scale`}>
								{SHADE_STEPS.map((step) => {
									// every role has a real ramp token: --neutral-3, --danger-7…
									const stepToken = `--${role}-${step}`
									const background = `var(${stepToken})`
									return <span key={step} title={stepToken} style={{ background }} />
								})}
							</div>
						</div>
					)
				})}
				<hr className="colorPaletteDivider" />
				<strong className="colorPaletteSectionTitle">Scale</strong>
				<ScaleControl isInline />
			</div>
		</details>
	)
}
