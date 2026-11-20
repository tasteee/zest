import '@tasteee/zest'

const DEMO_CODE = `const resolveToneClass = (props: any): string => {
  if (props.tone === 'secondary') return 'is-secondary'
  if (props.tone === 'tertiary') return 'is-tertiary'
  return 'is-primary'
}`

export const Example = () => (
  <z-code-block filename="overlay.tsx" language="tsx" code={DEMO_CODE} hasLineNumbers />
)
