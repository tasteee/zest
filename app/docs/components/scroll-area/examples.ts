export const examples = {
	quickPreview: `import { ScrollArea } from '@tasteee/zest'

export function ScrollAreaDemo() {
  const tags = Array.from({ length: 30 }, (_, i) => \`Tag \${i + 1}\`)

  return (
    <ScrollArea className="h-64 w-72 rounded-md border">
      <div className="p-4">
        {tags.map((tag) => (
          <p key={tag} className="text-sm py-1 border-b last:border-0">
            {tag}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
}`,

	usageImport: `import { ScrollArea, ScrollBar } from '@tasteee/zest'`,

	usage: `{/* Always set a fixed height for vertical scroll */}
<ScrollArea className="h-64">
  {/* long content */}
</ScrollArea>`,

	vertical: `<ScrollArea className="h-64 w-72 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <p key={item} className="text-sm py-1 border-b last:border-0">
        {item}
      </p>
    ))}
  </div>
</ScrollArea>`,

	horizontal: `<ScrollArea className="w-64 whitespace-nowrap rounded-md border">
  <div className="flex gap-3 p-4">
    {tags.map((tag) => (
      <span key={tag} className="shrink-0 rounded-md border px-3 py-1 text-sm">
        {tag}
      </span>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,

	bothAxes: `<ScrollArea className="h-64 w-64 rounded-md border">
  <div style={{ width: '600px', height: '400px', padding: '1rem' }}>
    Content wider and taller than the container
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`
} as const
