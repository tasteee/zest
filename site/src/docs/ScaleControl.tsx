import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ScaleControl.css'

export const SCALE_OPTIONS = ['75%', '80%', '90%', '100%', '110%', '125%', '150%'] as const
export type ScaleOptionT = (typeof SCALE_OPTIONS)[number]

export const STORAGE_KEY = 'zest-scale-preference'

export const readStoredScale = (): ScaleOptionT => {
	if (typeof window === 'undefined') return '100%'
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY)
		if (stored && (SCALE_OPTIONS as readonly string[]).includes(stored)) {
			return stored as ScaleOptionT
		}
	} catch {
		// localStorage might be unavailable/blocked
	}
	return '100%'
}

export const writeStoredScale = (scale: ScaleOptionT): void => {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(STORAGE_KEY, scale)
	} catch {
		// localStorage might be unavailable/blocked
	}
}

export const applyScale = (scale: ScaleOptionT): void => {
	if (typeof document === 'undefined') return
	const html = document.documentElement
	html.setAttribute('data-scale', scale)
	html.style.fontSize = scale === '100%' ? '' : scale
	html.style.setProperty('--scale', scale)
	const factor = Number.parseInt(scale, 10) / 100
	html.style.setProperty('--scaling', String(factor))
}

export const getStepDownScale = (current: ScaleOptionT): ScaleOptionT => {
	const index = SCALE_OPTIONS.indexOf(current)
	if (index > 0) return SCALE_OPTIONS[index - 1]
	return current
}

export const getStepUpScale = (current: ScaleOptionT): ScaleOptionT => {
	const index = SCALE_OPTIONS.indexOf(current)
	if (index < SCALE_OPTIONS.length - 1) return SCALE_OPTIONS[index + 1]
	return current
}

// Apply stored scale immediately if running in browser
if (typeof document !== 'undefined') {
	const initialScale = readStoredScale()
	if (initialScale !== '100%') {
		applyScale(initialScale)
	}
}

export const ScaleControl = () => {
	const [scale, setScale] = useState<ScaleOptionT>(readStoredScale)
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		applyScale(scale)
	}, [scale])

	useEffect(() => {
		if (!isOpen) return
		const onPointerDown = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false)
			}
		}
		document.addEventListener('pointerdown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen])

	const currentIndex = SCALE_OPTIONS.indexOf(scale)
	const canScaleDown = currentIndex > 0
	const canScaleUp = currentIndex < SCALE_OPTIONS.length - 1

	const handleSetScale = (nextScale: ScaleOptionT) => {
		setScale(nextScale)
		writeStoredScale(nextScale)
		setIsOpen(false)
	}

	const handleScaleDown = () => {
		if (canScaleDown) {
			const nextScale = getStepDownScale(scale)
			setScale(nextScale)
			writeStoredScale(nextScale)
		}
	}

	const handleScaleUp = () => {
		if (canScaleUp) {
			const nextScale = getStepUpScale(scale)
			setScale(nextScale)
			writeStoredScale(nextScale)
		}
	}

	return (
		<div className="ScaleControl" ref={containerRef}>
			<button
				type="button"
				className="ScaleControlStep"
				onClick={handleScaleDown}
				disabled={!canScaleDown}
				title={canScaleDown ? `Scale down to ${SCALE_OPTIONS[currentIndex - 1]}` : 'Minimum scale (75%)'}
				aria-label="Scale down"
			>
				<svg viewBox="0 0 16 16" aria-hidden="true">
					<line x1="3.5" y1="8" x2="12.5" y2="8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
				</svg>
			</button>

			<button
				type="button"
				className="ScaleControlTrigger"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-haspopup="true"
				title="Adjust scale (75% – 150%)"
				aria-label={`Current scale ${scale}. Click to select scale`}
			>
				<span>{scale}</span>
				<svg className="ScaleControlChevron" viewBox="0 0 12 12" aria-hidden="true">
					<path
						d="M2.5 4.5 L6 8 L9.5 4.5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<button
				type="button"
				className="ScaleControlStep"
				onClick={handleScaleUp}
				disabled={!canScaleUp}
				title={canScaleUp ? `Scale up to ${SCALE_OPTIONS[currentIndex + 1]}` : 'Maximum scale (150%)'}
				aria-label="Scale up"
			>
				<svg viewBox="0 0 16 16" aria-hidden="true">
					<line x1="8" y1="3.5" x2="8" y2="12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
					<line x1="3.5" y1="8" x2="12.5" y2="8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
				</svg>
			</button>

			{isOpen && (
				<div className="ScaleControlMenu" role="menu" aria-label="Scale options">
					<div className="ScaleControlHeader">
						<span>Scale</span>
						{scale !== '100%' && (
							<button type="button" className="ScaleControlReset" onClick={() => handleSetScale('100%')}>
								Reset
							</button>
						)}
					</div>
					{SCALE_OPTIONS.map((option) => {
						const isSelected = option === scale
						return (
							<button
								key={option}
								type="button"
								role="menuitemradio"
								aria-checked={isSelected}
								className={`ScaleControlOption ${isSelected ? 'is-active' : ''}`}
								onClick={() => handleSetScale(option)}
							>
								<span>{option}</span>
								{option === '100%' && <span className="ScaleControlOptionTag">Default</span>}
								{isSelected && (
									<svg className="ScaleControlCheck" viewBox="0 0 16 16" aria-hidden="true">
										<path
											d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								)}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}
