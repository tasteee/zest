'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { z } from '@/components/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '@/components/docs/component-preview'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { avatarProps, avatarImageProps, avatarFallbackProps } from './props'
import { examples } from './examples'
export default function AvatarDocsPage() {
	return (
		<div className='space-y-16'>
			{/* Breadcrumb */}
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/components' className='hover:text-foreground transition-colors'>
					Components
				</Link>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>Avatar</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>ZAvatar</h1>
					<z.badge isGhost isNeutral>
						Component
					</z.badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					An image element with a fallback for representing the user. Displays a profile picture with graceful fallback to
					initials or an icon.
				</p>
			</div>

			{/* Quick Preview */}
			<ComponentPreview
				title='Default Avatar'
				description='A basic avatar with an image and fallback.'
				code={examples.quickPreview}
			>
				<Avatar>
					<AvatarImage src='/placeholder-user.jpg' alt='User' />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
			</ComponentPreview>

			{/* Usage */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Usage</h2>
				<CodeBlock code={examples.usageImport} language='tsx' />
				<CodeBlock
					code={examples.usage}
					language='tsx'
				/>
			</section>

			{/* Examples */}
			<section className='space-y-8'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Examples</h2>

				{/* Sizes */}
				<ComponentPreview
					title='Sizes'
					description='Avatars can be rendered at different sizes using className.'
					code={examples.sizes}
				>
					<div className='flex items-center gap-4'>
						<Avatar className='size-6'>
							<AvatarImage src='/placeholder-user.jpg' alt='User' />
							<AvatarFallback className='text-xs'>SM</AvatarFallback>
						</Avatar>
						<Avatar className='size-8'>
							<AvatarImage src='/placeholder-user.jpg' alt='User' />
							<AvatarFallback>MD</AvatarFallback>
						</Avatar>
						<Avatar className='size-12'>
							<AvatarImage src='/placeholder-user.jpg' alt='User' />
							<AvatarFallback>LG</AvatarFallback>
						</Avatar>
						<Avatar className='size-16'>
							<AvatarImage src='/placeholder-user.jpg' alt='User' />
							<AvatarFallback className='text-xl'>XL</AvatarFallback>
						</Avatar>
					</div>
				</ComponentPreview>

				{/* Fallback */}
				<ComponentPreview
					title='Fallback'
					description='When the image fails to load, the fallback is displayed.'
					code={examples.fallback}
				>
					<div className='flex items-center gap-4'>
						<Avatar>
							<AvatarImage src='/broken-image.jpg' alt='User' />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src='/broken-image.jpg' alt='User' />
							<AvatarFallback>AB</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage src='/broken-image.jpg' alt='User' />
							<AvatarFallback>TK</AvatarFallback>
						</Avatar>
					</div>
				</ComponentPreview>

				{/* Avatar Group */}
				<ComponentPreview
					title='Avatar Group'
					description='Multiple avatars can be stacked together.'
					code={examples.avatarGroup}
				>
					<div className='flex -space-x-2'>
						<Avatar className='border-2 border-background'>
							<AvatarImage src='/placeholder-user.jpg' alt='User 1' />
							<AvatarFallback>U1</AvatarFallback>
						</Avatar>
						<Avatar className='border-2 border-background'>
							<AvatarImage src='/placeholder-user.jpg' alt='User 2' />
							<AvatarFallback>U2</AvatarFallback>
						</Avatar>
						<Avatar className='border-2 border-background'>
							<AvatarImage src='/placeholder-user.jpg' alt='User 3' />
							<AvatarFallback>U3</AvatarFallback>
						</Avatar>
						<Avatar className='border-2 border-background'>
							<AvatarFallback>+5</AvatarFallback>
						</Avatar>
					</div>
				</ComponentPreview>

				{/* With Status Indicator */}
				<ComponentPreview
					title='With Status Indicator'
					description='Add a status indicator to show online/offline state.'
					code={examples.withStatusIndicator}
				>
					<div className='flex items-center gap-4'>
						<div className='relative'>
							<Avatar>
								<AvatarImage src='/placeholder-user.jpg' alt='User' />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
							<span className='absolute bottom-0 right-0 size-2.5 rounded-full bg-neon-purple border-2 border-background' />
						</div>
						<div className='relative'>
							<Avatar>
								<AvatarImage src='/placeholder-user.jpg' alt='User' />
								<AvatarFallback>AB</AvatarFallback>
							</Avatar>
							<span className='absolute bottom-0 right-0 size-2.5 rounded-full bg-muted-foreground border-2 border-background' />
						</div>
					</div>
				</ComponentPreview>
			</section>

			{/* API Reference */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>API Reference</h2>
				<PropsTable title='Avatar' props={avatarProps} />
				<PropsTable title='AvatarImage' props={avatarImageProps} />
				<PropsTable title='AvatarFallback' props={avatarFallbackProps} />
			</section>

			{/* Accessibility */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Accessibility</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Image Alt Text</h3>
							<p className='text-sm text-muted-foreground'>
								Always provide meaningful alt text for avatar images. This helps screen reader users understand who or what the
								avatar represents.
							</p>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Fallback Content</h3>
							<p className='text-sm text-muted-foreground'>
								The fallback content should be descriptive enough to identify the user when the image cannot be loaded. Typically,
								initials work well.
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
