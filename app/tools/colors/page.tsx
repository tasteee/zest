'use client'

import * as React from 'react'
import Link from 'next/link'
import * as Phosphor from '@phosphor-icons/react'
import * as Culori from 'culori'
import styles from './colorsPage.module.css'

type AlgorithmT = 'perceptual' | 'tailwind' | 'ant' | 'material'
type FormatT = 'hex' | 'hexa' | 'oklch' | 'lab' | 'hsl' | 'hsb'
type NamingSchemeT = 'scale' | 'index' | 'tone'
type OrientationT = 'vertical' | 'horizontal'

type SavedScaleT = {
	id: string
	seed: string
	steps: number
	algorithm: AlgorithmT
	values: string[]
}

type OklchColorT = {
	mode: 'oklch'
	l: number
	c: number
	h: number
}

type ScaleGenerationSettingsT = {
	algorithm: AlgorithmT
	steps: number
	includeWhite: boolean
	includeBlack: boolean
}

const savedScalesStorageKey = 'taste-tools-color-scales'

const availableFormats: FormatT[] = ['oklch', 'hex', 'hexa', 'lab', 'hsl', 'hsb']
const availableAlgorithms: AlgorithmT[] = ['perceptual', 'tailwind', 'ant', 'material']

const toneNames = ['lightest', 'lighter', 'light', 'soft', 'base', 'deep', 'darker', 'dark', 'darkest']

const convertToOklch = Culori.converter('oklch')
const convertToRgb = Culori.converter('rgb')
const convertToLab = Culori.converter('lab')
const convertToHsl = Culori.converter('hsl')
const convertToHsv = Culori.converter('hsv')

const clampNumber = (value: number, minimumValue: number, maximumValue: number): number => {
	const isBelowMinimum = value < minimumValue
	if (isBelowMinimum) return minimumValue

	const isAboveMaximum = value > maximumValue
	if (isAboveMaximum) return maximumValue

	return value
}

const interpolateNumber = (startValue: number, endValue: number, progressValue: number): number => {
	return startValue + (endValue - startValue) * progressValue
}

const normalizeHexColor = (value: string): string => {
	const normalizedValue = value.trim()
	const hasLeadingHash = normalizedValue.startsWith('#')
	if (hasLeadingHash) return normalizedValue

	return `#${normalizedValue}`
}

const getAlgorithmLabel = (algorithm: AlgorithmT): string => {
	const isPerceptual = algorithm === 'perceptual'
	if (isPerceptual) return 'Perceptual'

	const isTailwind = algorithm === 'tailwind'
	if (isTailwind) return 'Tailwind-like'

	const isAnt = algorithm === 'ant'
	if (isAnt) return 'Ant Design-like'

	return 'Material tonal'
}

const getScaleLabel = (index: number, totalSteps: number, namingScheme: NamingSchemeT): string => {
	const isScaleScheme = namingScheme === 'scale'
	if (isScaleScheme) {
		const hasMultipleSteps = totalSteps > 1
		const progressValue = hasMultipleSteps ? index / (totalSteps - 1) : 0
		const scaleValue = Math.round(50 + progressValue * 900)
		return `${scaleValue}`
	}

	const isIndexScheme = namingScheme === 'index'
	if (isIndexScheme) {
		return `${index + 1}`
	}

	const hasSingleStep = totalSteps === 1
	if (hasSingleStep) return 'base'

	const progressValue = index / (totalSteps - 1)
	const mappedToneIndex = Math.round(progressValue * (toneNames.length - 1))
	const safeToneIndex = clampNumber(mappedToneIndex, 0, toneNames.length - 1)
	const toneName = toneNames[safeToneIndex]
	return toneName
}

const getSeedOklchColor = (seedColor: string): OklchColorT => {
	const parsedColor = Culori.parse(seedColor)
	const hasParsedColor = parsedColor !== undefined && parsedColor !== null
	if (!hasParsedColor) {
		return {
			mode: 'oklch',
			l: 0.75,
			c: 0.24,
			h: 350
		}
	}

	const convertedColor = convertToOklch(parsedColor as Culori.Color)
	const hasConvertedColor = convertedColor !== undefined && convertedColor !== null
	if (!hasConvertedColor) {
		return {
			mode: 'oklch',
			l: 0.75,
			c: 0.24,
			h: 350
		}
	}

	const convertedColorObject = convertedColor as { l?: number; c?: number; h?: number }

	const lightnessValue = typeof convertedColorObject.l === 'number' ? convertedColorObject.l : 0.75
	const chromaValue = typeof convertedColorObject.c === 'number' ? convertedColorObject.c : 0.24
	const hueValue = typeof convertedColorObject.h === 'number' ? convertedColorObject.h : 350

	return {
		mode: 'oklch',
		l: clampNumber(lightnessValue, 0, 1),
		c: clampNumber(chromaValue, 0, 0.37),
		h: hueValue
	}
}

const getAdjustedLightness = (progressValue: number, algorithm: AlgorithmT): number => {
	const isTailwind = algorithm === 'tailwind'
	if (isTailwind) {
		const curvedProgress = Math.pow(progressValue, 1.15)
		return interpolateNumber(0.98, 0.08, curvedProgress)
	}

	const isAnt = algorithm === 'ant'
	if (isAnt) {
		const curvedProgress = Math.pow(progressValue, 0.92)
		return interpolateNumber(0.98, 0.1, curvedProgress)
	}

	const isMaterial = algorithm === 'material'
	if (isMaterial) {
		return interpolateNumber(0.99, 0.04, progressValue)
	}

	return interpolateNumber(0.98, 0.08, progressValue)
}

const getAdjustedChroma = (seedChroma: number, progressValue: number, algorithm: AlgorithmT): number => {
	const distanceFromMiddle = Math.abs(progressValue - 0.5)

	const isTailwind = algorithm === 'tailwind'
	if (isTailwind) {
		const midpointBoost = 1 - Math.pow(distanceFromMiddle * 2, 1.5)
		const scaleValue = 0.35 + midpointBoost * 0.65
		return clampNumber(seedChroma * scaleValue, 0, 0.37)
	}

	const isAnt = algorithm === 'ant'
	if (isAnt) {
		const midpointDistance = progressValue - 0.55
		const midpointPower = -Math.pow(midpointDistance, 2) / 0.08
		const midpointBoost = Math.exp(midpointPower)
		const scaleValue = 0.45 + midpointBoost * 0.75
		return clampNumber(seedChroma * scaleValue, 0, 0.37)
	}

	const isMaterial = algorithm === 'material'
	if (isMaterial) {
		const scaleValue = 0.3 + (1 - progressValue) * 0.7
		return clampNumber(seedChroma * scaleValue, 0, 0.37)
	}

	const midpointBoost = 1 - Math.abs(progressValue * 2 - 1)
	const scaleValue = 0.4 + midpointBoost * 0.6
	return clampNumber(seedChroma * scaleValue, 0, 0.37)
}

const getEffectiveLightnessRange = (
	includeWhite: boolean,
	includeBlack: boolean,
	algorithm: AlgorithmT
): { start: number; end: number } => {
	const fullRangeStart = getAdjustedLightness(0, algorithm)
	const fullRangeEnd = getAdjustedLightness(1, algorithm)

	const startValue = includeWhite ? fullRangeStart : interpolateNumber(fullRangeStart, fullRangeEnd, 0.08)
	const endValue = includeBlack ? fullRangeEnd : interpolateNumber(fullRangeStart, fullRangeEnd, 0.92)

	return {
		start: startValue,
		end: endValue
	}
}

const generateScale = (seedColor: string, settings: ScaleGenerationSettingsT): OklchColorT[] => {
	const safeStepCount = clampNumber(settings.steps, 5, 16)
	const scaleColors: OklchColorT[] = []
	const seedOklchColor = getSeedOklchColor(seedColor)
	const lightnessRange = getEffectiveLightnessRange(settings.includeWhite, settings.includeBlack, settings.algorithm)

	let index = 0
	while (index < safeStepCount) {
		const hasMultipleSteps = safeStepCount > 1
		const interpolationValue = hasMultipleSteps ? index / (safeStepCount - 1) : 0
		const algorithmLightness = getAdjustedLightness(interpolationValue, settings.algorithm)
		const normalizedAlgorithmLightness =
			(algorithmLightness - getAdjustedLightness(1, settings.algorithm)) /
			(getAdjustedLightness(0, settings.algorithm) - getAdjustedLightness(1, settings.algorithm))
		const remappedLightness = interpolateNumber(lightnessRange.start, lightnessRange.end, normalizedAlgorithmLightness)
		const remappedProgress = (remappedLightness - lightnessRange.start) / (lightnessRange.end - lightnessRange.start)
		const chromaProgress = clampNumber(remappedProgress, 0, 1)
		const adjustedChroma = getAdjustedChroma(seedOklchColor.c, chromaProgress, settings.algorithm)

		scaleColors.push({
			mode: 'oklch',
			l: clampNumber(remappedLightness, 0, 1),
			c: adjustedChroma,
			h: seedOklchColor.h
		})

		index = index + 1
	}

	return scaleColors
}

const formatNumber = (value: number, decimals: number): string => {
	return value.toFixed(decimals)
}

const formatColorValue = (color: OklchColorT, format: FormatT): string => {
	const isHex = format === 'hex'
	if (isHex) {
		const redGreenBlueColor = convertToRgb(color as Culori.Color)
		const hasRedGreenBlueColor = redGreenBlueColor !== undefined && redGreenBlueColor !== null
		if (!hasRedGreenBlueColor) return ''

		const formattedHex = Culori.formatHex(redGreenBlueColor as Culori.Color)
		const hasFormattedHex = typeof formattedHex === 'string'
		if (!hasFormattedHex) return ''

		return formattedHex.toUpperCase()
	}

	const isHexAlpha = format === 'hexa'
	if (isHexAlpha) {
		const redGreenBlueColor = convertToRgb(color as Culori.Color)
		const hasRedGreenBlueColor = redGreenBlueColor !== undefined && redGreenBlueColor !== null
		if (!hasRedGreenBlueColor) return ''

		const formattedHexAlpha = Culori.formatHex8(redGreenBlueColor as Culori.Color)
		const hasFormattedHexAlpha = typeof formattedHexAlpha === 'string'
		if (!hasFormattedHexAlpha) return ''

		return formattedHexAlpha.toUpperCase()
	}

	const isOklch = format === 'oklch'
	if (isOklch) {
		return `oklch(${formatNumber(color.l, 3)} ${formatNumber(color.c, 3)} ${formatNumber(color.h, 2)})`
	}

	const isLab = format === 'lab'
	if (isLab) {
		const labColor = convertToLab(color as Culori.Color)
		const hasLabColor = labColor !== undefined && labColor !== null
		if (!hasLabColor) return ''

		const labColorObject = labColor as { l?: number; a?: number; b?: number }
		const lightnessValue = typeof labColorObject.l === 'number' ? labColorObject.l : 0
		const aValue = typeof labColorObject.a === 'number' ? labColorObject.a : 0
		const bValue = typeof labColorObject.b === 'number' ? labColorObject.b : 0
		return `lab(${formatNumber(lightnessValue, 2)} ${formatNumber(aValue, 2)} ${formatNumber(bValue, 2)})`
	}

	const isHsl = format === 'hsl'
	if (isHsl) {
		const hslColor = convertToHsl(color as Culori.Color)
		const hasHslColor = hslColor !== undefined && hslColor !== null
		if (!hasHslColor) return ''

		const hslColorObject = hslColor as { h?: number; s?: number; l?: number }
		const hueValue = typeof hslColorObject.h === 'number' ? hslColorObject.h : 0
		const saturationValue = typeof hslColorObject.s === 'number' ? hslColorObject.s : 0
		const lightnessValue = typeof hslColorObject.l === 'number' ? hslColorObject.l : 0
		return `hsl(${formatNumber(hueValue, 2)} ${formatNumber(saturationValue * 100, 2)}% ${formatNumber(lightnessValue * 100, 2)}%)`
	}

	const hsvColor = convertToHsv(color as Culori.Color)
	const hasHsvColor = hsvColor !== undefined && hsvColor !== null
	if (!hasHsvColor) return ''

	const hsvColorObject = hsvColor as { h?: number; s?: number; v?: number }
	const hueValue = typeof hsvColorObject.h === 'number' ? hsvColorObject.h : 0
	const saturationValue = typeof hsvColorObject.s === 'number' ? hsvColorObject.s : 0
	const brightnessValue = typeof hsvColorObject.v === 'number' ? hsvColorObject.v : 0

	return `hsb(${formatNumber(hueValue, 2)} ${formatNumber(saturationValue * 100, 2)}% ${formatNumber(brightnessValue * 100, 2)}%)`
}

const getContrastTextColor = (backgroundColor: OklchColorT): string => {
	const redGreenBlueColor = convertToRgb(backgroundColor as Culori.Color)
	const hasRedGreenBlueColor = redGreenBlueColor !== undefined && redGreenBlueColor !== null
	if (!hasRedGreenBlueColor) return 'var(--primary)'

	const redGreenBlueObject = redGreenBlueColor as { r?: number; g?: number; b?: number }
	const redValue = typeof redGreenBlueObject.r === 'number' ? redGreenBlueObject.r : 0
	const greenValue = typeof redGreenBlueObject.g === 'number' ? redGreenBlueObject.g : 0
	const blueValue = typeof redGreenBlueObject.b === 'number' ? redGreenBlueObject.b : 0
	const luminance = redValue * 0.2126 + greenValue * 0.7152 + blueValue * 0.0722
	const isLightSurface = luminance > 0.55

	if (isLightSurface) return 'oklch(0.16 0 0)'

	return 'oklch(0.98 0 0)'
}

const ColorToolsPage = () => {
	const seedColorState = React.useState('#FF1493')
	const seedColor = seedColorState[0]
	const setSeedColor = seedColorState[1]

	const selectedFormatState = React.useState<FormatT>('oklch')
	const selectedFormat = selectedFormatState[0]
	const setSelectedFormat = selectedFormatState[1]

	const selectedAlgorithmState = React.useState<AlgorithmT>('perceptual')
	const selectedAlgorithm = selectedAlgorithmState[0]
	const setSelectedAlgorithm = selectedAlgorithmState[1]

	const stepCountState = React.useState<number>(12)
	const stepCount = stepCountState[0]
	const setStepCount = stepCountState[1]

	const includesWhiteState = React.useState<boolean>(true)
	const includesWhite = includesWhiteState[0]
	const setIncludesWhite = includesWhiteState[1]

	const includesBlackState = React.useState<boolean>(true)
	const includesBlack = includesBlackState[0]
	const setIncludesBlack = includesBlackState[1]

	const namingSchemeState = React.useState<NamingSchemeT>('scale')
	const namingScheme = namingSchemeState[0]
	const setNamingScheme = namingSchemeState[1]

	const orientationState = React.useState<OrientationT>('horizontal')
	const orientation = orientationState[0]
	const setOrientation = orientationState[1]

	const isSidebarCollapsedState = React.useState<boolean>(false)
	const isSidebarCollapsed = isSidebarCollapsedState[0]
	const setIsSidebarCollapsed = isSidebarCollapsedState[1]

	const isOptionsOpenState = React.useState<boolean>(false)
	const isOptionsOpen = isOptionsOpenState[0]
	const setIsOptionsOpen = isOptionsOpenState[1]

	const isCopyMenuOpenState = React.useState<boolean>(false)
	const isCopyMenuOpen = isCopyMenuOpenState[0]
	const setIsCopyMenuOpen = isCopyMenuOpenState[1]

	const isAlgorithmMenuOpenState = React.useState<boolean>(false)
	const isAlgorithmMenuOpen = isAlgorithmMenuOpenState[0]
	const setIsAlgorithmMenuOpen = isAlgorithmMenuOpenState[1]

	const savedScalesState = React.useState<SavedScaleT[]>([])
	const savedScales = savedScalesState[0]
	const setSavedScales = savedScalesState[1]

	const copiedStepIdentifierState = React.useState<string | null>(null)
	const copiedStepIdentifier = copiedStepIdentifierState[0]
	const setCopiedStepIdentifier = copiedStepIdentifierState[1]

	const hasSaveFeedbackState = React.useState<boolean>(false)
	const hasSaveFeedback = hasSaveFeedbackState[0]
	const setHasSaveFeedback = hasSaveFeedbackState[1]

	const generatedColors = React.useMemo(() => {
		return generateScale(seedColor, {
			algorithm: selectedAlgorithm,
			steps: stepCount,
			includeWhite: includesWhite,
			includeBlack: includesBlack
		})
	}, [seedColor, selectedAlgorithm, stepCount, includesWhite, includesBlack])

	React.useEffect(() => {
		const hasWindow = typeof window !== 'undefined'
		if (!hasWindow) return

		const rawSavedScales = window.localStorage.getItem(savedScalesStorageKey)
		const hasRawSavedScales = typeof rawSavedScales === 'string'
		if (!hasRawSavedScales) return

		try {
			const parsedSavedScales = JSON.parse(rawSavedScales) as unknown
			const isSavedScaleArray = Array.isArray(parsedSavedScales)
			if (!isSavedScaleArray) return

			const validatedScales: SavedScaleT[] = []
			let index = 0
			while (index < parsedSavedScales.length) {
				const currentValue = parsedSavedScales[index]
				const hasObjectValue = typeof currentValue === 'object' && currentValue !== null
				if (hasObjectValue) {
					const currentScale = currentValue as SavedScaleT
					const hasId = typeof currentScale.id === 'string'
					const hasSeed = typeof currentScale.seed === 'string'
					const hasSteps = typeof currentScale.steps === 'number'
					const hasValues = Array.isArray(currentScale.values)
					const hasAlgorithm =
						currentScale.algorithm === 'perceptual' ||
						currentScale.algorithm === 'tailwind' ||
						currentScale.algorithm === 'ant' ||
						currentScale.algorithm === 'material'

					const isValidScale = hasId && hasSeed && hasSteps && hasValues && hasAlgorithm
					if (isValidScale) {
						validatedScales.push(currentScale)
					}
				}

				index = index + 1
			}

			setSavedScales(validatedScales)
		} catch {
			return
		}
	}, [])

	React.useEffect(() => {
		const hasWindow = typeof window !== 'undefined'
		if (!hasWindow) return

		const serializedSavedScales = JSON.stringify(savedScales)
		window.localStorage.setItem(savedScalesStorageKey, serializedSavedScales)
	}, [savedScales])

	const seedColorPreviewValue = React.useMemo(() => {
		const seedOklchColor = getSeedOklchColor(seedColor)
		return formatColorValue(seedOklchColor, selectedFormat)
	}, [seedColor, selectedFormat])

	const scaleLabels = React.useMemo(() => {
		const labels: string[] = []
		let index = 0
		while (index < generatedColors.length) {
			const label = getScaleLabel(index, generatedColors.length, namingScheme)
			labels.push(label)
			index = index + 1
		}

		return labels
	}, [generatedColors, namingScheme])

	const scaleValuesInSelectedFormat = React.useMemo(() => {
		const values: string[] = []
		let index = 0
		while (index < generatedColors.length) {
			const color = generatedColors[index]
			const value = formatColorValue(color, selectedFormat)
			values.push(value)
			index = index + 1
		}

		return values
	}, [generatedColors, selectedFormat])

	const copyTextToClipboard = (text: string, copiedIdentifier: string) => {
		const hasWindow = typeof window !== 'undefined'
		if (!hasWindow) return

		const hasClipboard =
			typeof window.navigator !== 'undefined' &&
			typeof window.navigator.clipboard !== 'undefined' &&
			typeof window.navigator.clipboard.writeText === 'function'

		if (!hasClipboard) return

		window.navigator.clipboard.writeText(text).then(() => {
			setCopiedStepIdentifier(copiedIdentifier)

			window.setTimeout(() => {
				setCopiedStepIdentifier(null)
			}, 600)
		})
	}

	const cycleFormat = () => {
		const currentIndex = availableFormats.indexOf(selectedFormat)
		const hasCurrentIndex = currentIndex >= 0
		if (!hasCurrentIndex) {
			setSelectedFormat('oklch')
			return
		}

		const nextIndex = (currentIndex + 1) % availableFormats.length
		const nextFormat = availableFormats[nextIndex]
		setSelectedFormat(nextFormat)
	}

	const saveCurrentScale = () => {
		const currentScaleValues: string[] = []
		let index = 0
		while (index < generatedColors.length) {
			const color = generatedColors[index]
			const colorValue = formatColorValue(color, 'oklch')
			currentScaleValues.push(colorValue)
			index = index + 1
		}

		const savedScale: SavedScaleT = {
			id: `${Date.now()}`,
			seed: seedColor,
			steps: stepCount,
			algorithm: selectedAlgorithm,
			values: currentScaleValues
		}

		setSavedScales((currentSavedScales) => {
			const nextSavedScales = [savedScale, ...currentSavedScales]
			return nextSavedScales.slice(0, 48)
		})

		setHasSaveFeedback(true)

		window.setTimeout(() => {
			setHasSaveFeedback(false)
		}, 600)
	}

	const copyJsonExport = () => {
		const exportObject: Record<string, string> = {}

		let index = 0
		while (index < scaleLabels.length) {
			const label = scaleLabels[index]
			const value = scaleValuesInSelectedFormat[index]
			exportObject[label] = value
			index = index + 1
		}

		const jsonText = JSON.stringify(exportObject, null, 2)
		copyTextToClipboard(jsonText, 'full-scale')
		setIsCopyMenuOpen(false)
	}

	const copyCssVariablesExport = () => {
		const cssLines: string[] = []

		let index = 0
		while (index < scaleLabels.length) {
			const label = scaleLabels[index]
			const value = scaleValuesInSelectedFormat[index]
			cssLines.push(`--color-${label}: ${value};`)
			index = index + 1
		}

		const cssText = cssLines.join('\n')
		copyTextToClipboard(cssText, 'full-scale')
		setIsCopyMenuOpen(false)
	}

	const copyTailwindExport = () => {
		const tailwindLines: string[] = []
		tailwindLines.push('colors: {')
		tailwindLines.push('  primary: {')

		let index = 0
		while (index < scaleLabels.length) {
			const label = scaleLabels[index]
			const value = scaleValuesInSelectedFormat[index]
			tailwindLines.push(`    ${label}: \"${value}\",`)
			index = index + 1
		}

		tailwindLines.push('  }')
		tailwindLines.push('}')

		const tailwindText = tailwindLines.join('\n')
		copyTextToClipboard(tailwindText, 'full-scale')
		setIsCopyMenuOpen(false)
	}

	const loadSavedScale = (savedScale: SavedScaleT) => {
		setSeedColor(savedScale.seed)
		setStepCount(savedScale.steps)
		setSelectedAlgorithm(savedScale.algorithm)
	}

	const decreaseStepCount = () => {
		const hasMinimumSteps = stepCount <= 5
		if (hasMinimumSteps) return

		setStepCount(stepCount - 1)
	}

	const increaseStepCount = () => {
		const hasMaximumSteps = stepCount >= 16
		if (hasMaximumSteps) return

		setStepCount(stepCount + 1)
	}

	const setSeedColorFromInput = (inputValue: string) => {
		const normalizedColor = normalizeHexColor(inputValue)
		const parsedColor = Culori.parse(normalizedColor)
		const hasValidColor = parsedColor !== undefined && parsedColor !== null
		if (!hasValidColor) return

		const hasHexLength = normalizedColor.length === 7 || normalizedColor.length === 4
		if (!hasHexLength) return

		const formattedHexColor = formatColorValue(getSeedOklchColor(normalizedColor), 'hex')
		const hasFormattedColor = formattedHexColor.length > 0
		if (!hasFormattedColor) return

		setSeedColor(formattedHexColor)
	}

	const currentAlgorithmLabel = getAlgorithmLabel(selectedAlgorithm)

	const layoutClassName = isSidebarCollapsed
		? `${styles.colorsToolsPage} ${styles.colorsToolsPageSidebarCollapsed}`
		: styles.colorsToolsPage

	const scaleClassName =
		orientation === 'vertical'
			? `${styles.scaleSurface} ${styles.scaleSurfaceVertical}`
			: `${styles.scaleSurface} ${styles.scaleSurfaceHorizontal}`

	return (
		<main className={layoutClassName}>
			<aside className={styles.colorsSidebar}>
				<div className={styles.colorsSidebarHeader}>
					<Link href='/tools' className={styles.colorsSidebarBackLink}>
						Tools
					</Link>
					<h2 className={styles.colorsSidebarTitle}>Color</h2>
					<button
						type='button'
						className={styles.sidebarCollapseButton}
						onClick={() => setIsSidebarCollapsed(true)}
						aria-label='Collapse sidebar'
					>
						<Phosphor.CaretLeft size={20} weight='regular' />
					</button>
				</div>

				<nav className={styles.colorsSidebarNavigation}>
					<button type='button' className={styles.colorsSidebarNavigationItemActive}>
						Color Scale Creator
					</button>
					<button type='button' className={styles.colorsSidebarNavigationItemMuted} disabled>
						Contrast Inspector
					</button>
					<button type='button' className={styles.colorsSidebarNavigationItemMuted} disabled>
						Palette Harmonizer
					</button>
				</nav>
			</aside>

			{isSidebarCollapsed && (
				<button
					type='button'
					className={styles.sidebarExpandButton}
					onClick={() => setIsSidebarCollapsed(false)}
					aria-label='Expand sidebar'
				>
					<Phosphor.CaretRight size={20} weight='regular' />
				</button>
			)}

			<section className={styles.colorsWorkspace}>
				<header className={styles.scaleHeader}>
					<div className={styles.scaleHeaderTitleRow}>
						<h1 className={styles.scaleHeaderTitle}>Color Scale Creator</h1>
					</div>

					<div className={styles.scaleHeaderToolbarWrap}>
						<div className={styles.scaleHeaderToolbar}>
							<button type='button' className={styles.toolbarTextButton} onClick={cycleFormat}>
								{selectedFormat}
							</button>

							<div className={styles.toolbarAlgorithmArea}>
								<button
									type='button'
									className={styles.toolbarSubtleButton}
									onClick={() => setIsAlgorithmMenuOpen(!isAlgorithmMenuOpen)}
								>
									{currentAlgorithmLabel}
								</button>

								{isAlgorithmMenuOpen && (
									<div className={styles.toolbarInlineMenu}>
										{availableAlgorithms.map((algorithmOption) => {
											const algorithmLabel = getAlgorithmLabel(algorithmOption)
											const isActiveAlgorithm = selectedAlgorithm === algorithmOption
											const algorithmClassName = isActiveAlgorithm ? styles.toolbarInlineMenuItemActive : styles.toolbarInlineMenuItem

											return (
												<button
													key={algorithmOption}
													type='button'
													className={algorithmClassName}
													onClick={() => {
														setSelectedAlgorithm(algorithmOption)
														setIsAlgorithmMenuOpen(false)
													}}
												>
													{algorithmLabel}
												</button>
											)
										})}
									</div>
								)}
							</div>

							<div className={styles.toolbarIconArea}>
								<button
									type='button'
									className={styles.toolbarIconButton}
									onClick={() => setIsCopyMenuOpen(!isCopyMenuOpen)}
									aria-label='Copy exports'
								>
									<Phosphor.Copy size={18} weight='regular' />
								</button>

								{isCopyMenuOpen && (
									<div className={styles.toolbarIconMenu}>
										<button type='button' className={styles.toolbarIconMenuItem} onClick={copyJsonExport}>
											Copy JSON
										</button>
										<button type='button' className={styles.toolbarIconMenuItem} onClick={copyCssVariablesExport}>
											Copy CSS variables
										</button>
										<button type='button' className={styles.toolbarIconMenuItem} onClick={copyTailwindExport}>
											Copy Tailwind config
										</button>
									</div>
								)}
							</div>

							<button type='button' className={styles.toolbarIconButton} onClick={saveCurrentScale} aria-label='Save scale'>
								{!hasSaveFeedback && <Phosphor.FloppyDisk size={18} weight='regular' />}
								{hasSaveFeedback && <Phosphor.Check size={18} weight='regular' />}
							</button>
						</div>

						<button type='button' className={styles.optionsToggleButton} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
							Options
						</button>
					</div>
				</header>

				{isOptionsOpen && (
					<section className={styles.optionsPanel}>
						<div className={styles.optionsRow}>
							<p className={styles.optionsLabel}>Step count</p>
							<div className={styles.stepperControl}>
								<button type='button' className={styles.stepperButton} onClick={decreaseStepCount}>
									-
								</button>
								<span className={styles.stepperValue}>{stepCount}</span>
								<button type='button' className={styles.stepperButton} onClick={increaseStepCount}>
									+
								</button>
							</div>
						</div>

						<div className={styles.optionsRow}>
							<p className={styles.optionsLabel}>Endpoints</p>
							<div className={styles.optionsToggleGroup}>
								<label className={styles.optionsCheckboxLabel}>
									<input type='checkbox' checked={includesWhite} onChange={() => setIncludesWhite(!includesWhite)} />
									Include white
								</label>
								<label className={styles.optionsCheckboxLabel}>
									<input type='checkbox' checked={includesBlack} onChange={() => setIncludesBlack(!includesBlack)} />
									Include black
								</label>
							</div>
						</div>

						<div className={styles.optionsRow}>
							<p className={styles.optionsLabel}>Naming</p>
							<div className={styles.optionsToggleGroup}>
								<button
									type='button'
									className={namingScheme === 'scale' ? styles.optionChipActive : styles.optionChip}
									onClick={() => setNamingScheme('scale')}
								>
									50-950
								</button>
								<button
									type='button'
									className={namingScheme === 'index' ? styles.optionChipActive : styles.optionChip}
									onClick={() => setNamingScheme('index')}
								>
									1-12
								</button>
								<button
									type='button'
									className={namingScheme === 'tone' ? styles.optionChipActive : styles.optionChip}
									onClick={() => setNamingScheme('tone')}
								>
									light-dark
								</button>
							</div>
						</div>

						<div className={styles.optionsRow}>
							<p className={styles.optionsLabel}>Layout</p>
							<div className={styles.optionsToggleGroup}>
								<button
									type='button'
									className={orientation === 'vertical' ? styles.optionChipActive : styles.optionChip}
									onClick={() => setOrientation('vertical')}
								>
									Vertical
								</button>
								<button
									type='button'
									className={orientation === 'horizontal' ? styles.optionChipActive : styles.optionChip}
									onClick={() => setOrientation('horizontal')}
								>
									Horizontal
								</button>
							</div>
						</div>
					</section>
				)}

				<section className={styles.seedPickerSection}>
					<div className={styles.seedPickerSwatch} style={{ backgroundColor: seedColor }} />

					<div className={styles.seedPickerControlRow}>
						<label htmlFor='seedColorInput' className={styles.seedPickerControlLabel}>
							Color picker
						</label>
						<input
							id='seedColorInput'
							type='color'
							value={seedColor}
							className={styles.seedPickerNativeControl}
							onChange={(event) => {
								setSeedColor(event.currentTarget.value.toUpperCase())
							}}
							aria-label='Choose seed color'
						/>
					</div>

					<div className={styles.seedPickerValueRow}>
						<input
							type='text'
							className={styles.seedPickerHexInput}
							value={seedColor}
							onChange={(event) => setSeedColorFromInput(event.currentTarget.value)}
							aria-label='Seed hex value'
						/>
						<p className={styles.seedPickerFormatValue}>{seedColorPreviewValue}</p>
					</div>
				</section>

				<section className={scaleClassName}>
					{generatedColors.map((color, index) => {
						const label = scaleLabels[index]
						const value = scaleValuesInSelectedFormat[index]
						const copiedIdentifier = `step-${index}`
						const isCopied = copiedStepIdentifier === copiedIdentifier
						const overlayTextColor = getContrastTextColor(color)
						const stepClassName = orientation === 'vertical' ? styles.scaleStepVertical : styles.scaleStepHorizontal

						return (
							<button
								key={`${label}-${value}`}
								type='button'
								className={`${styles.scaleStep} ${stepClassName}`}
								style={{ backgroundColor: formatColorValue(color, 'oklch') }}
								onClick={() => copyTextToClipboard(value, copiedIdentifier)}
								title={value}
							>
								<span className={styles.scaleStepOverlay} style={{ color: overlayTextColor }}>
									<span className={styles.scaleStepLabel}>{label}</span>
									{!isCopied && <span className={styles.scaleStepValue}>{value}</span>}
									{isCopied && <span className={styles.scaleStepValue}>Copied</span>}
								</span>
							</button>
						)
					})}
				</section>
			</section>

			<section className={styles.savedDock}>
				<div className={styles.savedDockRail}>
					{savedScales.length === 0 && <p className={styles.savedDockEmpty}>Saved scales appear here</p>}
					{savedScales.map((savedScale) => {
						const tooltip = `${savedScale.seed} | ${getAlgorithmLabel(savedScale.algorithm)} | ${savedScale.steps} steps`

						return (
							<button
								key={savedScale.id}
								type='button'
								className={styles.savedDockSwatch}
								style={{ backgroundColor: savedScale.seed }}
								onClick={() => loadSavedScale(savedScale)}
								title={tooltip}
								aria-label={tooltip}
							/>
						)
					})}
				</div>
			</section>
		</main>
	)
}

export default ColorToolsPage
