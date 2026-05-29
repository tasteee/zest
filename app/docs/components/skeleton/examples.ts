export const examples = {
	quickPreview: `import { ZSkeleton } from '@tasteee/zest'

export function SkeletonDemo() {
  return <ZSkeleton className="h-4 w-62.5" />
}`,

	usageImport: `import { ZSkeleton } from '@tasteee/zest'`,

	usage: `<ZSkeleton className="h-4 w-50" />`,

	cardSkeleton: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-62.5" />
    <Skeleton className="h-4 w-50" />
  </div>
</div>`,

	articleSkeleton: `<div className="space-y-6 w-full max-w-md">
  <Skeleton className="h-48 w-full rounded-lg" />
  <div className="space-y-3">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
</div>`,

	listSkeleton: `<div className="space-y-4 w-full max-w-sm">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ))}
</div>`,

	tableSkeleton: `<div className="w-full space-y-3">
  <div className="flex gap-4 pb-2 border-b border-border">
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
    <Skeleton className="h-4 w-1/4" />
  </div>
  {[1, 2, 3, 4].map((row) => (
    <div key={row} className="flex gap-4 py-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  ))}
</div>`,

	formSkeleton: `<div className="w-full max-w-sm space-y-4">
  <div className="space-y-2">
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-10 w-full rounded-md" />
  </div>
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-10 w-full rounded-md" />
  </div>
  <div className="space-y-2">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-24 w-full rounded-md" />
  </div>
  <Skeleton className="h-10 w-full rounded-md" />
</div>`
} as const
