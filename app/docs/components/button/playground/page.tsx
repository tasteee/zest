'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Copy, Download, Plus } from 'lucide-react'
import { z } from '@/components/ui'
import { toast } from '@/components/ui/use-toast'

type ButtonKind = 'outlined' | 'solid' | 'ghost'
type ButtonColor = 'neutral' | 'purple' | 'purple' | 'pink' | 'pink'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonIcon = 'none' | 'plus' | 'download' | 'arrow-right' | 'check'
type IconPosition = 'leading' | 'trailing'

const kindOptions: Array<{ label: string; value: ButtonKind; prop: string }> = [
	{ label: 'Outlined', value: 'outlined', prop: 'isOutlined' },
	{ label: 'Solid', value: 'solid', prop: 'isSolid' },
	{ label: 'Ghost', value: 'ghost', prop: 'isGhost' }
]

const colorOptions: Array<{ label: string; value: ButtonColor; prop: string }> = [
	{ label: 'Neutral', value: 'neutral', prop: 'isNeutral' },
	{ label: 'Purple', value: 'purple', prop: 'isPurple' },
	{ label: 'Purple', value: 'purple', prop: 'isPurple' },
	{ label: 'Pink', value: 'pink', prop: 'isPink' },
	{ label: 'Pink', value: 'pink', prop: 'isPink' }
]

const sizeOptions: Array<{ label: string; value: ButtonSize; prop: string }> = [
	{ label: 'Extra small', value: 'xs', prop: 'isExtraSmall' },
	{ label: 'Small', value: 'sm', prop: 'isSmall' },
	{ label: 'Medium', value: 'md', prop: 'isMedium' },
	{ label: 'Large', value: 'lg', prop: 'isLarge' },
	{ label: 'Extra large', value: 'xl', prop: 'isExtraLarge' }
]

const iconOptions: Array<{ label: string; value: ButtonIcon; importName?: string; component?: typeof Plus }> = [
	{ label: 'None', value: 'none' },
	{ label: 'Plus', value: 'plus', importName: 'Plus', component: Plus },
	{ label: 'Download', value: 'download', importName: 'Download', component: Download },
	{ label: 'Arrow right', value: 'arrow-right', importName: 'ArrowRight', component: ArrowRight },
	{ label: 'Check', value: 'check', importName: 'Check', component: Check }
]

const iconPositionOptions: Array<{ label: string; value: IconPosition }> = [
	{ label: 'Leading', value: 'leading' },
	{ label: 'Trailing', value: 'trailing' }
]

function getOptionProp<T extends string>(options: Array<{ value: T; prop: string }>, value: T) {
	return options.find((option) => option.value === value)?.prop
}

function getIconOption(icon: ButtonIcon) {
	return iconOptions.find((option) => option.value === icon) ?? iconOptions[0]
}

function getCodeText(text: string) {
	return text.trim() || 'Button'
}

function escapeJsxText(text: string) {
	return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export default function ButtonPlaygroundPage() {
	const [kind, setKind] = useState<ButtonKind>('outlined')
	const [color, setColor] = useState<ButtonColor>('neutral')
	const [size, setSize] = useState<ButtonSize>('md')
	const [label, setLabel] = useState('Button')
	const [icon, setIcon] = useState<ButtonIcon>('none')
	const [iconPosition, setIconPosition] = useState<IconPosition>('leading')
	const [isDisabled, setIsDisabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const selectedIcon = getIconOption(icon)
	const Icon = selectedIcon.component
	const buttonText = getCodeText(label)
	const kindProp = getOptionProp(kindOptions, kind)
	const colorProp = getOptionProp(colorOptions, color)
	const sizeProp = getOptionProp(sizeOptions, size)
	const buttonProps = {
		...(kindProp ? { [kindProp]: true } : {}),
		...(colorProp ? { [colorProp]: true } : {}),
		...(sizeProp ? { [sizeProp]: true } : {}),
		isDisabled,
		isLoading
	}

	const code = useMemo(() => {
		const propNames = [kindProp, colorProp, sizeProp, isDisabled && 'isDisabled', isLoading && 'isLoading'].filter(Boolean)
		const propString = propNames.length > 0 ? ` ${propNames.join(' ')}` : ''
		const escapedText = escapeJsxText(buttonText)

		if (selectedIcon.importName == null) {
			return `import { z } from '@tasteee/zest'

export function ButtonDemo() {
  return <z.button${propString}>${escapedText}</z.button>
}`
		}

		const iconElement = `<${selectedIcon.importName} />`
		const children =
			iconPosition === 'leading' ? `${iconElement}\n      ${escapedText}` : `${escapedText}\n      ${iconElement}`

		return `import { ${selectedIcon.importName} } from 'lucide-react'
import { z } from '@tasteee/zest'

export function ButtonDemo() {
  return (
    <z.button${propString}>
      ${children}
    </z.button>
  )
}`
	}, [buttonText, colorProp, iconPosition, isDisabled, isLoading, kindProp, selectedIcon.importName, sizeProp])

	const copyCode = async () => {
		await navigator.clipboard.writeText(code)
		toast({ title: 'Code copied', description: 'The current button configuration is ready to paste.' })
	}

	return (
		<z.box className='space-y-10'>
			<z.box className='space-y-3'>
				<z.text.body className='text-sm font-medium text-muted-foreground'>Components / Button</z.text.body>
				<z.text.h1>Button Playground</z.text.h1>
				<z.text.body className='max-w-2xl text-lg leading-8 text-muted-foreground'>
					Tune the button props, preview the result, then copy the JSX for the current configuration.
				</z.text.body>
			</z.box>

			<z.card className='gap-0 overflow-hidden rounded-lg border-border py-0 shadow-none'>
				<z.box className='grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]'>
					<z.box className='flex min-h-65 items-center justify-center border-b border-border bg-muted/20 p-10 lg:border-b-0 lg:border-r'>
						<z.button {...buttonProps}>
							{Icon && iconPosition === 'leading' ? <Icon /> : null}
							{buttonText}
							{Icon && iconPosition === 'trailing' ? <Icon /> : null}
						</z.button>
					</z.box>

					<z.box className='grid gap-5 p-5'>
						<z.box className='grid gap-2'>
							<z.label htmlFor='button-label'>Label</z.label>
							<z.input
								id='button-label'
								value={label}
								onChange={(event) => setLabel(event.target.value)}
								placeholder='Button label'
							/>
						</z.box>

						<z.box className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1'>
							<z.box className='grid gap-2'>
								<z.label htmlFor='button-kind'>Kind</z.label>
								<z.select value={kind} onValueChange={(value) => setKind(value as ButtonKind)}>
									<z.select.trigger id='button-kind' className='w-full'>
										<z.select.value />
									</z.select.trigger>
									<z.select.content>
										{kindOptions.map((option) => (
											<z.select.item key={option.value} value={option.value}>
												{option.label}
											</z.select.item>
										))}
									</z.select.content>
								</z.select>
							</z.box>

							<z.box className='grid gap-2'>
								<z.label htmlFor='button-color'>Color</z.label>
								<z.select value={color} onValueChange={(value) => setColor(value as ButtonColor)}>
									<z.select.trigger id='button-color' className='w-full'>
										<z.select.value />
									</z.select.trigger>
									<z.select.content>
										{colorOptions.map((option) => (
											<z.select.item key={option.value} value={option.value}>
												{option.label}
											</z.select.item>
										))}
									</z.select.content>
								</z.select>
							</z.box>

							<z.box className='grid gap-2'>
								<z.label htmlFor='button-size'>Size</z.label>
								<z.select value={size} onValueChange={(value) => setSize(value as ButtonSize)}>
									<z.select.trigger id='button-size' className='w-full'>
										<z.select.value />
									</z.select.trigger>
									<z.select.content>
										{sizeOptions.map((option) => (
											<z.select.item key={option.value} value={option.value}>
												{option.label}
											</z.select.item>
										))}
									</z.select.content>
								</z.select>
							</z.box>

							<z.box className='grid gap-2'>
								<z.label htmlFor='button-icon'>Icon</z.label>
								<z.select value={icon} onValueChange={(value) => setIcon(value as ButtonIcon)}>
									<z.select.trigger id='button-icon' className='w-full'>
										<z.select.value />
									</z.select.trigger>
									<z.select.content>
										{iconOptions.map((option) => (
											<z.select.item key={option.value} value={option.value}>
												{option.label}
											</z.select.item>
										))}
									</z.select.content>
								</z.select>
							</z.box>

							<z.box className='grid gap-2'>
								<z.label htmlFor='button-icon-position'>Icon position</z.label>
								<z.select
									value={iconPosition}
									onValueChange={(value) => setIconPosition(value as IconPosition)}
									disabled={icon === 'none'}
								>
									<z.select.trigger id='button-icon-position' className='w-full'>
										<z.select.value />
									</z.select.trigger>
									<z.select.content>
										{iconPositionOptions.map((option) => (
											<z.select.item key={option.value} value={option.value}>
												{option.label}
											</z.select.item>
										))}
									</z.select.content>
								</z.select>
							</z.box>
						</z.box>

						<z.box className='grid gap-3 border-t border-border pt-4'>
							<z.box className='flex items-center justify-between gap-4'>
								<z.label htmlFor='button-disabled'>Disabled</z.label>
								<z.switch id='button-disabled' checked={isDisabled} onCheckedChange={setIsDisabled} />
							</z.box>
							<z.box className='flex items-center justify-between gap-4'>
								<z.label htmlFor='button-loading'>Loading</z.label>
								<z.switch id='button-loading' checked={isLoading} onCheckedChange={setIsLoading} />
							</z.box>
						</z.box>
					</z.box>
				</z.box>
			</z.card>

			<z.box as='section' className='space-y-4'>
				<z.box className='flex flex-wrap items-center justify-between gap-3'>
					<z.box>
						<z.text.h2>Current Code</z.text.h2>
						<z.text.body className='mt-1 text-sm text-muted-foreground'>Matches the controls above.</z.text.body>
					</z.box>
					<z.button isSolid isPurple isSmall onClick={copyCode}>
						<Copy className='h-4 w-4' />
						Copy Code
					</z.button>
				</z.box>
				<z.box
					as='pre'
					className='max-h-80 overflow-auto rounded-lg border border-border bg-muted/20 p-5 text-sm leading-6 text-foreground'
				>
					<z.box as='code'>{code}</z.box>
				</z.box>
			</z.box>
		</z.box>
	)
}
