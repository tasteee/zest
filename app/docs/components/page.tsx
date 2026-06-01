import Link from 'next/link'
import { z } from '@/components/ui'
import { COMPONENT_CATALOG } from './catalog'

const categories = ['Inputs', 'Data Display', 'Navigation', 'Overlays', 'Feedback', 'Layout'] as const

const statusMap = {
	ready: { label: 'Ready', badgeProps: { isOutline: true, isPurple: true } },
	'in-progress': { label: 'In Progress', badgeProps: { isOutline: true, isPurple: true } },
	planned: { label: 'Planned', badgeProps: { isOutline: true, isPink: true } }
} as const

function getStatusBadgeProps(status: keyof typeof statusMap) {
	return statusMap[status].badgeProps
}

export default function ComponentsPage() {
	return (
		<z.box className='space-y-12'>
			<z.box as='section' className='space-y-4'>
				<z.badge isGhost isNeutral className='font-mono text-xs'>
					Component Inventory
				</z.badge>
				<z.text.h1>Premium Component Library</z.text.h1>
				<z.text.body className='max-w-3xl text-lg text-muted-foreground'>
					Every target component now has a dedicated documentation route with configurable controls for density, accent emphasis,
					and presentation behavior. Build-ready components are flagged as ready; active design items are marked in progress.
				</z.text.body>
			</z.box>

			{categories.map((category) => {
				const entries = COMPONENT_CATALOG.filter((entry) => entry.category === category)

				return (
					<z.box as='section' key={category} className='space-y-4'>
						<z.text.h2>{category}</z.text.h2>
						<z.box className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
							{entries.map((entry) => (
								<Link key={entry.slug} href={`/docs/components/${entry.slug}`}>
									<z.card isHoverable tone='purple' className='h-full'>
										<z.cardContent className='space-y-3'>
											<z.box className='flex flex-wrap items-center gap-2'>
												<z.text.body className='text-lg font-semibold text-foreground'>{entry.name}</z.text.body>
												<z.badge {...getStatusBadgeProps(entry.status)}>{statusMap[entry.status].label}</z.badge>
												<z.badge isOutline isNeutral>
													{entry.foundation}
												</z.badge>
											</z.box>
											<z.text.body className='text-sm text-muted-foreground'>{entry.description}</z.text.body>
											<z.text.body className='text-xs text-muted-foreground'>
												Primary export: <z.text className='font-mono'>{entry.zName}</z.text>
											</z.text.body>
											{entry.notes && <z.text.body className='text-xs text-muted-foreground'>{entry.notes}</z.text.body>}
										</z.cardContent>
									</z.card>
								</Link>
							))}
						</z.box>
					</z.box>
				)
			})}
		</z.box>
	)
}
