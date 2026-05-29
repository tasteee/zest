export const examples = {
	quickPreview: `import { ZProgress } from '@tasteee/zest'

export function ProgressDemo() {
  return <ZProgress value={66} />
}`,

	usageImport: `import { ZProgress } from '@tasteee/zest'`,

	usage: `<ZProgress value={33} />`,

	colorVariants: `<div className="space-y-4 w-full">
  <Progress variant="default" value={60} />
  <Progress variant="purple" value={75} />
  <Progress variant="purple" value={45} />
  <Progress variant="pink" value={90} />
  <Progress variant="pink" value={30} />
</div>`,

	withLabel: `<div className="space-y-2 w-full">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span className="text-muted-foreground">66%</span>
  </div>
  <Progress value={66} />
</div>`,

	animated: `const [progress, setProgress] = useState(0)

// Animate progress
const startAnimation = () => {
  setProgress(0)
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval)
        return 100
      }
      return prev + 5
    })
  }, 100)
}

<div className="space-y-4 w-full">
  <Progress value={progress} variant="purple" />
  <Button onClick={startAnimation}>
    <RotateCcw className="mr-2 h-4 w-4" />
    Start
  </Button>
</div>`,

	multiStep: `<div className="space-y-6 w-full">
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Step 1: Account Setup</span>
      <span className="text-neon-purple">Complete</span>
    </div>
    <Progress value={100} variant="purple" />
  </div>
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Step 2: Profile Details</span>
      <span className="text-neon-pink">In Progress</span>
    </div>
    <Progress value={60} variant="pink" />
  </div>
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>Step 3: Verification</span>
      <span className="text-muted-foreground">Pending</span>
    </div>
    <Progress value={0} />
  </div>
</div>`
} as const
