'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { z } from '@/components/ui'
import { SearchIcon, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DocsSidebarContent } from './docs-sidebar'

export function DocsNav() {
	const pathname = usePathname()

	return (
		<z.box as='header' className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
			<z.box className='flex h-14 items-center px-4 lg:px-6'>
				{/* Mobile menu */}
				<Sheet>
					<SheetTrigger asChild>
						<z.button className='lg:hidden mr-4 p-2 -ml-2 hover:bg-muted rounded-md'>
							<MenuIcon className='h-5 w-5 text-foreground' />
							<z.text className='sr-only'>Toggle menu</z.text>
						</z.button>
					</SheetTrigger>
					<SheetContent side='left' className='w-72 p-0'>
						<z.box className='pt-6'>
							<DocsSidebarContent />
						</z.box>
					</SheetContent>
				</Sheet>

				{/* Logo */}
				<Link href='/' className='flex items-center gap-2 mr-6'>
					<z.text className='text-primary font-bold text-lg tracking-tight'>tasteink</z.text>
				</Link>

				{/* Main nav */}
				<z.box as='nav' className='hidden lg:flex items-center gap-6 text-sm'>
					<Link
						href='/docs'
						className={cn(
							'transition-colors hover:text-primary',
							pathname === '/docs' ? 'text-primary' : 'text-muted-foreground'
						)}
					>
						Overview
					</Link>
					<Link
						href='/docs/foundations'
						className={cn(
							'transition-colors hover:text-primary',
							pathname?.startsWith('/docs/foundations') ? 'text-primary' : 'text-muted-foreground'
						)}
					>
						Foundations
					</Link>
					<Link
						href='/docs/components'
						className={cn(
							'transition-colors hover:text-primary',
							pathname?.startsWith('/docs/components') ? 'text-primary' : 'text-muted-foreground'
						)}
					>
						Components
					</Link>
				</z.box>

				<z.box className='ml-auto flex items-center gap-4'>
					{/* Search placeholder */}
					<z.button className='hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md px-3 py-1.5 w-64 transition-colors hover:border-foreground/30'>
						<SearchIcon className='h-4 w-4' />
						<z.text>Search docs...</z.text>
						<z.text as='kbd' className='ml-auto text-xs bg-muted px-1.5 py-0.5 rounded'>⌘K</z.text>
					</z.button>

					<z.badge isOutline isPurple className='hidden sm:inline-flex'>
						v1.0
					</z.badge>

					<Link href='/'>
						<z.button isNeutral isSmall>
							Brand System
						</z.button>
					</Link>
				</z.box>
			</z.box>
		</z.box>
	)
}
