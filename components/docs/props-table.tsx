import { z } from '@/components/ui'
import { InlineCode } from './code-block'

export interface PropDefinition {
	name: string
	type: string
	default?: string
	defaultValue?: string
	required?: boolean
	description: string
}

interface PropsTableProps {
	title?: string
	props: PropDefinition[]
}

export function PropsTable({ title, props }: PropsTableProps) {
	return (
		<z.box className='space-y-3'>
			{title && <z.text.h3 className='text-lg font-semibold text-foreground'>{title}</z.text.h3>}
			<z.box className='overflow-hidden rounded-lg border border-border'>
				<z.table>
					<z.tableHeader>
						<z.tableRow className='hover:bg-transparent'>
							<z.tableHead className='w-45'>Prop</z.tableHead>
							<z.tableHead className='w-50'>Type</z.tableHead>
							<z.tableHead className='w-30'>Default</z.tableHead>
							<z.tableHead>Description</z.tableHead>
						</z.tableRow>
					</z.tableHeader>
					<z.tableBody>
						{props.map((prop) => (
							<z.tableRow key={prop.name} className='hover:bg-muted/30'>
								<z.tableCell className='font-mono text-sm'>
									<z.text className='text-primary'>{prop.name}</z.text>
									{prop.required && (
										<z.badge isOutline isPink className='ml-2 text-[10px]'>
											Required
										</z.badge>
									)}
								</z.tableCell>
								<z.tableCell>
									<InlineCode>{prop.type}</InlineCode>
								</z.tableCell>
								<z.tableCell className='text-muted-foreground'>
									{prop.defaultValue || prop.default ? <InlineCode>{prop.defaultValue ?? prop.default}</InlineCode> : '-'}
								</z.tableCell>
								<z.tableCell className='text-foreground'>{prop.description}</z.tableCell>
							</z.tableRow>
						))}
					</z.tableBody>
				</z.table>
			</z.box>
		</z.box>
	)
}
