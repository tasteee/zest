export const examples = {
	quickPreview: `import {
  Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent
} from '@tasteee/zest'
import { Inbox } from 'lucide-react'

export function EmptyStateDemo() {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <Inbox />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>There are no items to display at this time.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <button>Create item</button>
      </EmptyContent>
    </Empty>
  )
}`,

	usageImport: `import {
  Empty,
  EmptyMedia,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent
} from '@tasteee/zest'`,

	usage: `<Empty>
  <EmptyHeader>
    <EmptyTitle>Nothing here yet</EmptyTitle>
    <EmptyDescription>Get started by creating your first item.</EmptyDescription>
  </EmptyHeader>
</Empty>`,

	withIllustration: `import { ImageOff } from 'lucide-react'

{/* Icon variant — boxed icon */}
<Empty>
  <EmptyMedia variant="icon">
    <ImageOff />
  </EmptyMedia>
  <EmptyHeader>
    <EmptyTitle>No images found</EmptyTitle>
    <EmptyDescription>Upload your first image to get started.</EmptyDescription>
  </EmptyHeader>
</Empty>`,

	withAction: `import { FileX } from 'lucide-react'

<Empty>
  <EmptyMedia variant="icon">
    <FileX />
  </EmptyMedia>
  <EmptyHeader>
    <EmptyTitle>No documents</EmptyTitle>
    <EmptyDescription>
      You haven't created any documents yet.{' '}
      <a href="/new">Create one now</a> to get started.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <button>New document</button>
    <button>Import from file</button>
  </EmptyContent>
</Empty>`,

	minimal: `{/* Minimal — no icon, no CTA */}
<Empty>
  <EmptyHeader>
    <EmptyTitle>No notifications</EmptyTitle>
    <EmptyDescription>You're all caught up. Check back later.</EmptyDescription>
  </EmptyHeader>
</Empty>`
} as const
