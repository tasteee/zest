import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
		<div className='space-y-3'>
			{title && <h3 className='text-lg font-semibold text-foreground'>{title}</h3>}
			<div className='overflow-hidden rounded-lg border border-border'>
				<Table>
					<TableHeader>
						<TableRow className='hover:bg-transparent'>
							<TableHead className='w-45'>Prop</TableHead>
							<TableHead className='w-50'>Type</TableHead>
							<TableHead className='w-30'>Default</TableHead>
							<TableHead>Description</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{props.map((prop) => (
							<TableRow key={prop.name} className='hover:bg-muted/30'>
								<TableCell className='font-mono text-sm'>
									<span className='text-primary'>{prop.name}</span>
									{prop.required && (
										<z.badge isOutline isPink className='ml-2 text-[10px]'>
											Required
										</z.badge>
									)}
								</TableCell>
								<TableCell>
									<InlineCode>{prop.type}</InlineCode>
								</TableCell>
								<TableCell className='text-muted-foreground'>
									{prop.defaultValue || prop.default ? <InlineCode>{prop.defaultValue ?? prop.default}</InlineCode> : '-'}
								</TableCell>
								<TableCell className='text-foreground'>{prop.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
