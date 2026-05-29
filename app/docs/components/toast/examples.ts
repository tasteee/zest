export const examples = {
	quickPreview: `import { useToast } from '@/hooks/use-toast'

export function ToastDemo() {
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: 'Event created',
      description: 'Your event has been scheduled for tomorrow.'
    })
  }

  return <button onClick={handleClick}>Show toast</button>
}`,

	setup: `{/* In your root layout */}
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`,

	usageImport: `import { useToast } from '@/hooks/use-toast'`,

	usage: `const { toast } = useToast()

toast({
  title: 'Success',
  description: 'Your changes have been saved.'
})`,

	withAction: `import { ToastAction } from '@/components/ui/toast'

toast({
  title: 'File deleted',
  description: 'This action can be undone.',
  action: (
    <ToastAction altText="Undo delete" onClick={handleUndo}>
      Undo
    </ToastAction>
  )
})`,

	destructive: `toast({
  variant: 'destructive',
  title: 'Something went wrong',
  description: 'There was a problem with your request. Please try again.'
})`,

	simple: `{/* Title only */}
toast({ title: 'Profile updated' })

{/* Description only */}
toast({ description: 'Your session will expire in 5 minutes.' })`
} as const
