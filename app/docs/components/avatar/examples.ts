export const examples = {
	quickPreview: `import { ZAvatar, ZAvatarFallback, ZAvatarImage } from '@tasteee/zest'

export function AvatarDemo() {
  return (
    <ZAvatar>
      <ZAvatarImage src="/placeholder-user.jpg" alt="User" />
      <ZAvatarFallback>JD</ZAvatarFallback>
    </ZAvatar>
  )
}`,

	usageImport: `import { ZAvatar, ZAvatarFallback, ZAvatarImage } from '@tasteee/zest'`,

	usage: `<ZAvatar>
  <ZAvatarImage src="https://example.com/user.png" alt="User" />
  <ZAvatarFallback>JD</ZAvatarFallback>
</ZAvatar>`,

	sizes: `<div className="flex items-center gap-4">
  <Avatar className="size-6">
    <AvatarImage src="/placeholder-user.jpg" alt="User" />
    <AvatarFallback className="text-xs">SM</AvatarFallback>
  </Avatar>
  <Avatar className="size-8">
    <AvatarImage src="/placeholder-user.jpg" alt="User" />
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>
  <Avatar className="size-12">
    <AvatarImage src="/placeholder-user.jpg" alt="User" />
    <AvatarFallback>LG</AvatarFallback>
  </Avatar>
  <Avatar className="size-16">
    <AvatarImage src="/placeholder-user.jpg" alt="User" />
    <AvatarFallback className="text-xl">XL</AvatarFallback>
  </Avatar>
</div>`,

	fallback: `<div className="flex items-center gap-4">
  <Avatar>
    <AvatarImage src="/broken-image.jpg" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/broken-image.jpg" alt="User" />
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/broken-image.jpg" alt="User" />
    <AvatarFallback>TK</AvatarFallback>
  </Avatar>
</div>`,

	avatarGroup: `<div className="flex -space-x-2">
  <Avatar className="border-2 border-background">
    <AvatarImage src="/placeholder-user.jpg" alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/placeholder-user.jpg" alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/placeholder-user.jpg" alt="User 3" />
    <AvatarFallback>U3</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>`,

	withStatusIndicator: `<div className="flex items-center gap-4">
  <div className="relative">
    <Avatar>
      <AvatarImage src="/placeholder-user.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-neon-purple border-2 border-background" />
  </div>
  <div className="relative">
    <Avatar>
      <AvatarImage src="/placeholder-user.jpg" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
    <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-muted-foreground border-2 border-background" />
  </div>
</div>`
} as const
