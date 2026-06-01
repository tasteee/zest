'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight } from 'lucide-react'
import { avatarProps, avatarImageProps, avatarFallbackProps } from './props'
import { examples } from './examples'
export default function AvatarDocsPage() {
	return (
		<z.box className='space-y-16'>
			{/* Breadcrumb */}
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Avatar</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>ZAvatar</z.text.h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					An image element with a fallback for representing the user. Displays a profile picture with graceful fallback to
					initials or an icon.
				</z.text.body>
			</z.box>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Avatar'
				description='A basic avatar with an image and fallback.'
				code={examples.quickPreview}
			>
				<z.avatar>
					<z.avatarImage src='/placeholder-user.jpg' alt='User' />
					<z.avatarFallback>JD</z.avatarFallback>
				</z.avatar>
			</ComponentPreview>

			{/* Usage */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Usage</z.text.h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</z.box>

			{/* Examples */}
			<z.box as='section' className='space-y-8'>
				<z.text.h2>Examples</z.text.h2>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Avatars can be rendered at different sizes using className.'
					code={examples.sizes}
				>
					<z.box className='flex items-center gap-4'>
						<z.avatar className='size-6'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User' />
							<z.avatarFallback className='text-xs'>SM</z.avatarFallback>
						</z.avatar>
						<z.avatar className='size-8'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User' />
							<z.avatarFallback>MD</z.avatarFallback>
						</z.avatar>
						<z.avatar className='size-12'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User' />
							<z.avatarFallback>LG</z.avatarFallback>
						</z.avatar>
						<z.avatar className='size-16'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User' />
							<z.avatarFallback className='text-xl'>XL</z.avatarFallback>
						</z.avatar>
					</z.box>
				</ComponentPreview>

				{/* Fallback */}
				<ComponentPreview
					title='Fallback'
					description='When the image fails to load, the fallback is displayed.'
					code={examples.fallback}
				>
					<z.box className='flex items-center gap-4'>
						<z.avatar>
							<z.avatarImage src='/broken-image.jpg' alt='User' />
							<z.avatarFallback>JD</z.avatarFallback>
						</z.avatar>
						<z.avatar>
							<z.avatarImage src='/broken-image.jpg' alt='User' />
							<z.avatarFallback>AB</z.avatarFallback>
						</z.avatar>
						<z.avatar>
							<z.avatarImage src='/broken-image.jpg' alt='User' />
							<z.avatarFallback>TK</z.avatarFallback>
						</z.avatar>
					</z.box>
				</ComponentPreview>

				{/* Avatar Group */}
				<ComponentPreview
					title='Avatar Group'
					description='Multiple avatars can be stacked together.'
					code={examples.avatarGroup}
				>
					<z.box className='flex -space-x-2'>
						<z.avatar className='border-2 border-background'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User 1' />
							<z.avatarFallback>U1</z.avatarFallback>
						</z.avatar>
						<z.avatar className='border-2 border-background'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User 2' />
							<z.avatarFallback>U2</z.avatarFallback>
						</z.avatar>
						<z.avatar className='border-2 border-background'>
							<z.avatarImage src='/placeholder-user.jpg' alt='User 3' />
							<z.avatarFallback>U3</z.avatarFallback>
						</z.avatar>
						<z.avatar className='border-2 border-background'>
							<z.avatarFallback>+5</z.avatarFallback>
						</z.avatar>
					</z.box>
				</ComponentPreview>

				{/* With Status Indicator */}
				<ComponentPreview
					title='With Status Indicator'
					description='Add a status indicator to show online/offline state.'
					code={examples.withStatusIndicator}
				>
					<z.box className='flex items-center gap-4'>
						<z.box className='relative'>
							<z.avatar>
								<z.avatarImage src='/placeholder-user.jpg' alt='User' />
								<z.avatarFallback>JD</z.avatarFallback>
							</z.avatar>
							<z.text className='absolute bottom-0 right-0 size-2.5 rounded-full bg-neon-purple border-2 border-background' />
						</z.box>
						<z.box className='relative'>
							<z.avatar>
								<z.avatarImage src='/placeholder-user.jpg' alt='User' />
								<z.avatarFallback>AB</z.avatarFallback>
							</z.avatar>
							<z.text className='absolute bottom-0 right-0 size-2.5 rounded-full bg-muted-foreground border-2 border-background' />
						</z.box>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* API Reference */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>API Reference</z.text.h2>
				<PropsTable title='Avatar' props={avatarProps} />
				<PropsTable title='AvatarImage' props={avatarImageProps} />
				<PropsTable title='AvatarFallback' props={avatarFallbackProps} />
			</z.box>

			{/* Accessibility */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Accessibility</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Image Alt Text</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								Always provide meaningful alt text for avatar images. This helps screen reader users understand who or what the
								avatar represents.
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Fallback Content</z.text.h3>
							<z.text.body className='text-sm text-muted-foreground'>
								The fallback content should be descriptive enough to identify the user when the image cannot be loaded. Typically,
								initials work well.
							</z.text.body>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
