'use client'

import * as React from 'react'
import * as Phosphor from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
	'file:text-foreground placeholder:text-muted-foreground selection:bg-accent selection:text-accent-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
	{
		variants: {
			focusColor: {
				default: 'focus-visible:border-foreground/50 focus-visible:ring-foreground/20 focus-visible:ring-[3px]',
				green: 'focus-visible:border-neon-green focus-visible:ring-neon-green/30 focus-visible:ring-[3px]',
				purple: 'focus-visible:border-neon-purple focus-visible:ring-neon-purple/30 focus-visible:ring-[3px]',
				pink: 'focus-visible:border-neon-pink focus-visible:ring-neon-pink/30 focus-visible:ring-[3px]',
				orange: 'focus-visible:border-neon-orange focus-visible:ring-neon-orange/30 focus-visible:ring-[3px]'
			}
		},
		defaultVariants: {
			focusColor: 'default'
		}
	}
)

type InputProps = React.ComponentProps<'input'> & VariantProps<typeof inputVariants>

function Input({ className, type, focusColor, ...props }: InputProps) {
	const inputRef = React.useRef<HTMLInputElement>(null)

	const stepNumberInput = (direction: 'up' | 'down') => {
		const input = inputRef.current

		if (!input || props.disabled || props.readOnly) {
			return
		}

		input.focus()

		try {
			if (direction === 'up') {
				input.stepUp()
			} else {
				input.stepDown()
			}
		} catch {
			const step = Number(input.step) || 1
			const currentValue = Number(input.value) || 0
			input.value = String(direction === 'up' ? currentValue + step : currentValue - step)
		}

		input.dispatchEvent(new Event('input', { bubbles: true }))
		input.dispatchEvent(new Event('change', { bubbles: true }))
	}

	if (type === 'number') {
		return (
			<div className={cn('relative w-full min-w-0', className)} data-slot='number-input'>
				<input
					ref={inputRef}
					type={type}
					data-slot='input'
					className={cn(
						inputVariants({ focusColor }),
						'pr-12 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
					)}
					{...props}
				/>
				<div className='absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 flex-col overflow-hidden rounded-sm border border-border bg-transparent'>
					<button
						type='button'
						aria-label='Increment value'
						tabIndex={-1}
						disabled={props.disabled || props.readOnly}
						className='flex min-h-0 flex-1 items-center justify-center text-primary transition-colors hover:bg-muted active:bg-secondary disabled:pointer-events-none disabled:opacity-40'
						onMouseDown={(event) => event.preventDefault()}
						onClick={() => stepNumberInput('up')}
					>
						<Phosphor.CaretUpIcon size={12} weight='bold' />
					</button>
					<button
						type='button'
						aria-label='Decrement value'
						tabIndex={-1}
						disabled={props.disabled || props.readOnly}
						className='flex min-h-0 flex-1 items-center justify-center border-t border-border text-primary transition-colors hover:bg-muted active:bg-secondary disabled:pointer-events-none disabled:opacity-40'
						onMouseDown={(event) => event.preventDefault()}
						onClick={() => stepNumberInput('down')}
					>
						<Phosphor.CaretDownIcon size={12} weight='bold' />
					</button>
				</div>
			</div>
		)
	}

	return <input type={type} data-slot='input' className={cn(inputVariants({ focusColor }), className)} {...props} />
}

export { Input, inputVariants }
