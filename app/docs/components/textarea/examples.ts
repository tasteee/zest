export const examples = {
	quickPreview: `import { Textarea } from '@tasteee/zest'

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here..." />
}`,

	usageImport: `import { Textarea } from '@tasteee/zest'`,

	usage: `<Textarea placeholder="Type your message here..." />`,

	withLabel: `import { Label } from '@tasteee/zest'

<div className="flex flex-col gap-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Write your message..." />
</div>`,

	disabled: `<Textarea placeholder="This field is disabled" disabled />`,

	withCharCount: `import { useState } from 'react'

const MAX_LENGTH = 200

export function TextareaWithCount() {
  const [text, setText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const remainingChars = MAX_LENGTH - text.length

  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder="Write a bio..."
        maxLength={MAX_LENGTH}
      />
      <p className="text-xs text-muted-foreground text-right">
        {remainingChars} characters remaining
      </p>
    </div>
  )
}`,

	inForm: `<form className="flex flex-col gap-4">
  <div className="flex flex-col gap-2">
    <Label htmlFor="feedback">Feedback</Label>
    <Textarea
      id="feedback"
      name="feedback"
      placeholder="Tell us what you think..."
      required
    />
  </div>
  <z.button type="submit">Submit</z.button>
</form>`
} as const
