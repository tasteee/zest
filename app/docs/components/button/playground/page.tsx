'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Copy, Download, Plus } from 'lucide-react'
import { z } from '@/components/ui'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'

type ButtonKind = 'outlined' | 'solid' | 'ghost'
type ButtonColor = 'white' | 'green' | 'purple' | 'pink' | 'orange'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonIcon = 'none' | 'plus' | 'download' | 'arrow-right' | 'check'
type IconPosition = 'leading' | 'trailing'

const kindOptions: Array<{ label: string; value: ButtonKind; prop: string }> = [
	{ label: 'Outlined', value: 'outlined', prop: 'isOutlined' },
	{ label: 'Solid', value: 'solid', prop: 'isSolid' },
	{ label: 'Ghost', value: 'ghost', prop: 'isGhost' }
]

const colorOptions: Array<{ label: string; value: ButtonColor; prop: string }> = [
	{ label: 'White', value: 'white', prop: 'isWhite' },
	{ label: 'Green', value: 'green', prop: 'isGreen' },
	{ label: 'Purple', value: 'purple', prop: 'isPurple' },
	{ label: 'Pink', value: 'pink', prop: 'isPink' },
	{ label: 'Orange', value: 'orange', prop: 'isOrange' }
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
	const [color, setColor] = useState<ButtonColor>('white')
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
		<div className='space-y-10'>
			<div className='space-y-3'>
				<p className='text-sm font-medium text-muted-foreground'>Components / Button</p>
				<h1 className='text-4xl font-bold tracking-tight text-foreground'>Button Playground</h1>
				<p className='max-w-2xl text-lg leading-8 text-muted-foreground'>
					Tune the button props, preview the result, then copy the JSX for the current configuration.
				</p>
			</div>

			<Card className='gap-0 overflow-hidden rounded-lg border-border py-0 shadow-none'>
				<div className='grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]'>
					<div className='flex min-h-65 items-center justify-center border-b border-border bg-muted/20 p-10 lg:border-b-0 lg:border-r'>
						<z.button {...buttonProps}>
							{Icon && iconPosition === 'leading' ? <Icon /> : null}
							{buttonText}
							{Icon && iconPosition === 'trailing' ? <Icon /> : null}
						</z.button>
					</div>

					<div className='grid gap-5 p-5'>
						<div className='grid gap-2'>
							<Label htmlFor='button-label'>Label</Label>
							<Input
								id='button-label'
								value={label}
								onChange={(event) => setLabel(event.target.value)}
								placeholder='Button label'
							/>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1'>
							<div className='grid gap-2'>
								<Label htmlFor='button-kind'>Kind</Label>
								<Select value={kind} onValueChange={(value) => setKind(value as ButtonKind)}>
									<Select.Trigger id='button-kind' className='w-full'>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{kindOptions.map((option) => (
											<Select.Item key={option.value} value={option.value}>
												{option.label}
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='button-color'>Color</Label>
								<Select value={color} onValueChange={(value) => setColor(value as ButtonColor)}>
									<Select.Trigger id='button-color' className='w-full'>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{colorOptions.map((option) => (
											<Select.Item key={option.value} value={option.value}>
												{option.label}
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='button-size'>Size</Label>
								<Select value={size} onValueChange={(value) => setSize(value as ButtonSize)}>
									<Select.Trigger id='button-size' className='w-full'>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{sizeOptions.map((option) => (
											<Select.Item key={option.value} value={option.value}>
												{option.label}
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='button-icon'>Icon</Label>
								<Select value={icon} onValueChange={(value) => setIcon(value as ButtonIcon)}>
									<Select.Trigger id='button-icon' className='w-full'>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{iconOptions.map((option) => (
											<Select.Item key={option.value} value={option.value}>
												{option.label}
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='button-icon-position'>Icon position</Label>
								<Select
									value={iconPosition}
									onValueChange={(value) => setIconPosition(value as IconPosition)}
									disabled={icon === 'none'}
								>
									<Select.Trigger id='button-icon-position' className='w-full'>
										<Select.Value />
									</Select.Trigger>
									<Select.Content>
										{iconPositionOptions.map((option) => (
											<Select.Item key={option.value} value={option.value}>
												{option.label}
											</Select.Item>
										))}
									</Select.Content>
								</Select>
							</div>
						</div>

						<div className='grid gap-3 border-t border-border pt-4'>
							<div className='flex items-center justify-between gap-4'>
								<Label htmlFor='button-disabled'>Disabled</Label>
								<Switch id='button-disabled' checked={isDisabled} onCheckedChange={setIsDisabled} />
							</div>
							<div className='flex items-center justify-between gap-4'>
								<Label htmlFor='button-loading'>Loading</Label>
								<Switch id='button-loading' checked={isLoading} onCheckedChange={setIsLoading} />
							</div>
						</div>
					</div>
				</div>
			</Card>

			<section className='space-y-4'>
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<div>
						<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Current Code</h2>
						<p className='mt-1 text-sm text-muted-foreground'>Matches the controls above.</p>
					</div>
					<z.button isSolid isGreen isSmall onClick={copyCode}>
						<Copy className='h-4 w-4' />
						Copy Code
					</z.button>
				</div>
				<pre className='max-h-[320px] overflow-auto rounded-lg border border-border bg-muted/20 p-5 text-sm leading-6 text-foreground'>
					<code>{code}</code>
				</pre>
			</section>
		</div>
	)
}
