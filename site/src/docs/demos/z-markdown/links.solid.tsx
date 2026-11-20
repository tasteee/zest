import { createSignal } from 'solid-js'
import '@tasteee/zest'

const CONTENT = 'Read the [docs](https://example.com/docs) or jump to [usage](#usage).'

export const Example = () => {
  const [lastLink, setLastLink] = createSignal('Click a link.')

  const handleLinkClick = (event: CustomEvent<{ href: string }>) => setLastLink(`linkclick: ${event.detail.href}`)

  return (
    <>
      <z-markdown prop:content={CONTENT} onLinkClick={handleLinkClick} />
      <z-text size="sm" color="muted">{lastLink()}</z-text>
    </>
  )
}
