import { useMemo, useState } from 'react'
import * as Phosphor from '@phosphor-icons/react'
import { z } from './'

export const Playground = {
	parameters: {
		layout: 'fullscreen'
	},
	render: () => {
		const [kind, setKind] = useState<'outlined' | 'solid' | 'ghost'>('outlined')
		const [color, setColor] = useState<'white' | 'green' | 'purple' | 'pink' | 'orange'>('white')
		const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
		const [label, setLabel] = useState('Button')
		const [isDisabled, setIsDisabled] = useState(false)
		const [isLoading, setIsLoading] = useState(false)
		const [copied, setCopied] = useState(false)

		const kindProps = {
			outlined: { isOutlined: true },
			solid: { isSolid: true },
			ghost: { isGhost: true }
		}[kind]

		const colorProps = {
			white: { isWhite: true },
			green: { isGreen: true },
			purple: { isPurple: true },
			pink: { isPink: true },
			orange: { isOrange: true }
		}[color]

		const sizeProps = {
			xs: { isExtraSmall: true },
			sm: { isSmall: true },
			md: { isMedium: true },
			lg: { isLarge: true },
			xl: { isExtraLarge: true }
		}[size]

		const code = useMemo(() => {
			const props = [
				kindProps.isOutlined && 'isOutlined',
				kindProps.isSolid && 'isSolid',
				kindProps.isGhost && 'isGhost',
				colorProps.isWhite && 'isWhite',
				colorProps.isGreen && 'isGreen',
				colorProps.isPurple && 'isPurple',
				colorProps.isPink && 'isPink',
				colorProps.isOrange && 'isOrange',
				sizeProps.isExtraSmall && 'isExtraSmall',
				sizeProps.isSmall && 'isSmall',
				sizeProps.isMedium && 'isMedium',
				sizeProps.isLarge && 'isLarge',
				sizeProps.isExtraLarge && 'isExtraLarge',
				isDisabled && 'isDisabled',
				isLoading && 'isLoading'
			].filter(Boolean)

			return `<z.button ${props.join(' ')}>${label || 'Button'}</z.button>`
		}, [kind, color, size, label, isDisabled, isLoading])

		const copyCode = async () => {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			window.setTimeout(() => setCopied(false), 1200)
		}

		return (
			<div style={{ padding: 32, display: 'grid', gap: 24, maxWidth: 900 }}>
				<div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
					<div style={{ minHeight: 220, display: 'grid', placeItems: 'center', padding: 32 }}>
						<z.button {...kindProps} {...colorProps} {...sizeProps} isDisabled={isDisabled} isLoading={isLoading}>
							{label || 'Button'}
						</z.button>
					</div>

					<div style={{ borderTop: '1px solid var(--border)', padding: 20, display: 'grid', gap: 16 }}>
						<input value={label} onChange={(event) => setLabel(event.target.value)} placeholder='Button label' />

						<select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
							<option value='outlined'>Outlined</option>
							<option value='solid'>Solid</option>
							<option value='ghost'>Ghost</option>
						</select>

						<select value={color} onChange={(event) => setColor(event.target.value as typeof color)}>
							<option value='white'>White</option>
							<option value='green'>Green</option>
							<option value='purple'>Purple</option>
							<option value='pink'>Pink</option>
							<option value='orange'>Orange</option>
						</select>

						<select value={size} onChange={(event) => setSize(event.target.value as typeof size)}>
							<option value='xs'>Extra small</option>
							<option value='sm'>Small</option>
							<option value='md'>Medium</option>
							<option value='lg'>Large</option>
							<option value='xl'>Extra large</option>
						</select>

						<label>
							<input type='checkbox' checked={isDisabled} onChange={(event) => setIsDisabled(event.target.checked)} />
							Disabled
						</label>

						<label>
							<input type='checkbox' checked={isLoading} onChange={(event) => setIsLoading(event.target.checked)} />
							Loading
						</label>
					</div>
				</div>

				<div style={{ display: 'grid', gap: 12 }}>
					<z.button isSolid isGreen isSmall onClick={copyCode}>
						<Phosphor.Copy />
						{copied ? 'Copied' : 'Copy Code'}
					</z.button>

					<pre style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 16, overflow: 'auto' }}>
						<code>{code}</code>
					</pre>
				</div>
			</div>
		)
	}
}
