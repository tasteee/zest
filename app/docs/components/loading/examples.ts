export const examples = {
	quickPreview: `import { Spinner } from '@tasteee/zest'

export function LoadingDemo() {
  return <Spinner />
}`,

	usageImport: `import { Spinner } from '@tasteee/zest'`,

	usage: `<Spinner />

{/* Or via z namespace */}
<z.loading />`,

	sizes: `{/* Default — size-4 */}
<Spinner />

{/* Larger — override with className */}
<Spinner className="size-6" />
<Spinner className="size-8" />
<Spinner className="size-12" />`,

	inButton: `import { Spinner } from '@tasteee/zest'
import { useState } from 'react'

export function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? <Spinner className="mr-2" /> : null}
      {isLoading ? 'Saving...' : 'Save changes'}
    </button>
  )
}`,

	fullPage: `{/* Full-page loading overlay */}
<div className="flex h-screen items-center justify-center">
  <div className="flex flex-col items-center gap-3">
    <Spinner className="size-8" />
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
</div>`,

	inlineInCard: `<div className="rounded-lg border p-6 flex items-center justify-center h-40">
  <div className="flex flex-col items-center gap-2">
    <Spinner className="size-6" />
    <p className="text-sm text-muted-foreground">Fetching data...</p>
  </div>
</div>`
} as const
