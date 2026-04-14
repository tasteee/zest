import Link from 'next/link'
import { Card } from '@/components/ui/card'
import styles from './toolsPage.module.css'

type ToolCardT = {
	id: string
	title: string
	description: string
	href: string
	category: 'Design' | 'Development'
	isAvailable: boolean
}

const toolCards: ToolCardT[] = [
	{
		id: 'colors-scale',
		title: 'Color Scale Creator',
		description: 'Generate perceptual color scales and export instantly.',
		href: '/tools/colors',
		category: 'Design',
		isAvailable: true
	},
	{
		id: 'contrast',
		title: 'Contrast Inspector',
		description: 'Validate contrast pairs with practical readability checks.',
		href: '/tools/colors',
		category: 'Design',
		isAvailable: false
	},
	{
		id: 'tokens',
		title: 'Token Mapper',
		description: 'Map raw values into structured token formats.',
		href: '/tools/colors',
		category: 'Design',
		isAvailable: false
	},
	{
		id: 'component-audit',
		title: 'Component Audit',
		description: 'Scan components for token and style consistency.',
		href: '/tools/colors',
		category: 'Development',
		isAvailable: false
	},
	{
		id: 'css-cleanup',
		title: 'CSS Cleanup',
		description: 'Find duplicated declarations and simplify style drift.',
		href: '/tools/colors',
		category: 'Development',
		isAvailable: false
	},
	{
		id: 'bundle-view',
		title: 'Bundle View',
		description: 'Inspect package impact and surface avoidable weight.',
		href: '/tools/colors',
		category: 'Development',
		isAvailable: false
	}
]

const ToolsPage = () => {
	return (
		<main className={styles.toolsPage}>
			<section className={styles.toolsPageIntro}>
				<p className={styles.toolsPageEyebrow}>Utility Surface</p>
				<h1 className={styles.toolsPageTitle}>Tools</h1>
				<p className={styles.toolsPageDescription}>Purpose-built tools for design and development.</p>
			</section>

			<section className={styles.toolsPageGrid}>
				{toolCards.map((toolCard) => {
					const availabilityLabel = toolCard.isAvailable ? 'Open' : 'Soon'
					const availabilityClassName = toolCard.isAvailable
						? styles.toolsPageAvailabilityAvailable
						: styles.toolsPageAvailabilitySoon

					return (
						<Card key={toolCard.id} className={styles.toolsPageCard} isHoverable>
							<Card.Header>
								<div className={styles.toolsPageCardMeta}>
									<span className={styles.toolsPageCategory}>{toolCard.category}</span>
									<span className={availabilityClassName}>{availabilityLabel}</span>
								</div>
								<Card.Title className={styles.toolsPageCardTitle}>{toolCard.title}</Card.Title>
							</Card.Header>

							<Card.Content>
								<Card.Description className={styles.toolsPageCardDescription}>{toolCard.description}</Card.Description>
							</Card.Content>

							<Card.Footer className={styles.toolsPageCardActionRow}>
								{toolCard.isAvailable && (
									<Link className={styles.toolsPageCardLink} href={toolCard.href}>
										Open Tool
									</Link>
								)}
								{!toolCard.isAvailable && <span className={styles.toolsPageCardDisabledLink}>Coming Soon</span>}
							</Card.Footer>
						</Card>
					)
				})}
			</section>
		</main>
	)
}

export default ToolsPage
