export const examples = {
	quickPreview: `import { ZAlert, ZAlertDescription, ZAlertTitle } from '@tasteee/zest'
import { Info } from 'lucide-react'

export function AlertDemo() {
  return (
    <ZAlert>
      <Info className="h-4 w-4" />
      <ZAlertTitle>Default Alert</ZAlertTitle>
      <ZAlertDescription>
        You can add components to your app using the CLI.
      </ZAlertDescription>
    </ZAlert>
  )
}`,

	usageImport: `import { ZAlert, ZAlertDescription, ZAlertTitle } from '@tasteee/zest'`,

	usage: `<ZAlert isPurple>
  <CheckCircle2 className="h-4 w-4" />
  <ZAlertTitle>Success</ZAlertTitle>
  <ZAlertDescription>Alert description text.</ZAlertDescription>
</ZAlert>`,

	error: `<z.alert isRed>
  <CircleAlert className="h-4 w-4" />
  <z.alert.title>Error</z.alert.title>
  <z.alert.description>
    Your session has expired. Please log in again.
  </z.alert.description>
</z.alert>`,

	success: `<z.alert isPurple>
  <CheckCircle2 className="h-4 w-4" />
  <z.alert.title>Success</z.alert.title>
  <z.alert.description>
    Your changes have been saved successfully.
  </z.alert.description>
</z.alert>`,

	warning: `<z.alert isPink>
  <TriangleAlert className="h-4 w-4" />
  <z.alert.title>Warning</z.alert.title>
  <z.alert.description>
		Your storage is almost full. Consider upgrading your plan.
  </z.alert.description>
</z.alert>`,

	information: `<z.alert isPurple>
  <Terminal className="h-4 w-4" />
  <z.alert.title>Information</z.alert.title>
  <z.alert.description>
		Your account is pending verification. Check your email for next steps.
  </z.alert.description>
</z.alert>`,

	featured: `<z.alert isPink>
  <Sparkles className="h-4 w-4" />
  <z.alert.title>Featured</z.alert.title>
  <z.alert.description>
    This content has been marked as featured.
  </z.alert.description>
</z.alert>`,

	automaticDefaults: `<z.alert>
  <z.alert.description>
    This alert uses the default icon and title.
  </z.alert.description>
</z.alert>`
} as const
