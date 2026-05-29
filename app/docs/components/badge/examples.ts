export const examples = {
	quickPreview: `import { z } from '@tasteee/zest'

export function BadgeDemo() {
  return <z.badge>z.badge</z.badge>
}`,

	usageImport: `import { z } from '@tasteee/zest'`,

	usage: `<z.badge isOutline isNeutral>z.badge</z.badge>`,

	kindsAndColors: `<div className="flex flex-wrap gap-2">
  <z.badge isOutline isNeutral>Outline Neutral</z.badge>
  <z.badge isGhost isPurple>Ghost Purple</z.badge>
  <z.badge isSolid isPurple>Solid Purple</z.badge>
</div>`,

	withIcons: `<div className="flex flex-wrap gap-2">
  <z.badge isSolid isPurple>
    <Check className="h-3 w-3" />
    Verified
  </z.badge>
  <z.badge isGhost isPink>
    <Clock className="h-3 w-3" />
    Pending
  </z.badge>
  <z.badge isOutline isPink>
    <Zap className="h-3 w-3" />
    Featured
  </z.badge>
  <z.badge isSolid isNeutral asChild>
    <a href="#">Action</a>
  </z.badge>
</div>`,

	colorVariants: `<div className="grid grid-cols-2 gap-2 w-full max-w-xl">
  <z.badge isOutline isNeutral><Palette className="h-3 w-3" />neutral</z.badge>
  <z.badge isOutline isPurple><Palette className="h-3 w-3" />purple</z.badge>
  <z.badge isOutline isPurple><Palette className="h-3 w-3" />purple</z.badge>
  <z.badge isOutline isPink><Palette className="h-3 w-3" />pink</z.badge>
  <z.badge isOutline isPink><Palette className="h-3 w-3" />pink</z.badge>
</div>`
} as const
