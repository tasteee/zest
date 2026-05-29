export const examples = {
	quickPreview: `import {
  ZDialog,
  ZDialogContent,
  ZDialogDescription,
  ZDialogFooter,
  ZDialogHeader,
  ZDialogTitle,
  ZDialogTrigger,
  z,
  ZInput,
  ZLabel,
} from '@tasteee/zest'

export function DialogDemo() {
  return (
    <ZDialog>
      <ZDialogTrigger asChild>
        <z.button>Open Dialog</z.button>
      </ZDialogTrigger>
      <ZDialogContent className="sm:max-w-106.25>
        <ZDialogHeader>
          <ZDialogTitle>Edit profile</ZDialogTitle>
          <ZDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </ZDialogDescription>
        </ZDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <ZLabel htmlFor="name" className="text-right">Name</ZLabel>
            <ZInput id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
        <ZDialogFooter>
          <z.button type="submit">Save changes</z.button>
        </ZDialogFooter>
      </ZDialogContent>
    </ZDialog>
  )
}`,

	usageImport: `import {
  ZDialog,
  ZDialogContent,
  ZDialogDescription,
  ZDialogHeader,
  ZDialogTitle,
  ZDialogTrigger,
} from '@tasteee/zest'`,

	usage: `<ZDialog>
  <ZDialogTrigger>Open</ZDialogTrigger>
  <ZDialogContent>
    <ZDialogHeader>
      <ZDialogTitle>Are you sure?</ZDialogTitle>
      <ZDialogDescription>
        This action cannot be undone.
      </ZDialogDescription>
    </ZDialogHeader>
  </ZDialogContent>
</ZDialog>`,

	confirmationDialog: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        Are you absolutely sure?
      </DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="gap-2 sm:gap-0">
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,

	shareDialog: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Share className="mr-2 h-4 w-4" />
      Share
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Share link</DialogTitle>
      <DialogDescription>
        Anyone who has this link will be able to view this.
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="sr-only">Link</Label>
        <Input id="link" defaultValue="https://example.com/share/abc123" readOnly />
      </div>
      <Button type="submit" size="sm" className="px-3">
        <span className="sr-only">Copy</span>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
    <DialogFooter className="sm:justify-start">
      <DialogClose asChild>
        <Button type="button" variant="secondary">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,

	settingsDialog: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-131.25">
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      <DialogDescription>
        Configure your account settings and preferences.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <Input id="display-name" placeholder="Enter your display name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" placeholder="Tell us about yourself" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
} as const
