const DEMO_CODE = `const resolveToneClass = (props: any): string => {
  if (props.tone === 'secondary') return 'is-secondary'
  if (props.tone === 'tertiary') return 'is-tertiary'
  return 'is-primary'
}`

const codeBlock = document.querySelector('#code-block')
codeBlock.code = DEMO_CODE
