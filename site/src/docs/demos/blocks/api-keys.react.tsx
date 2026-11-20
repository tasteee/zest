import { useState } from 'react'
import '@tasteee/zest'

type ApiKeyT = { name: string; maskedKey: string; secret: string }

const API_KEYS: ApiKeyT[] = [
  { name: 'Production', maskedKey: 'zk_live_••••••••3f9a', secret: 'zk_live_example3f9a' },
  { name: 'Staging', maskedKey: 'zk_test_••••••••71bc', secret: 'zk_test_example71bc' }
]

const ApiKeyRow = (props: { apiKey: ApiKeyT }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyKey = async () => {
    await navigator.clipboard.writeText(props.apiKey.secret)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1500)
  }

  const copyLabel = isCopied ? 'Copied' : 'Copy'

  return (
    <z-list-row>
      <div style={{ flex: '1', minWidth: '0' }}>
        <z-text weight={600}>{props.apiKey.name}</z-text>
        <z-text size="sm" color="muted" style={{ display: 'block', fontFamily: 'var(--font-mono)' }}>
          {props.apiKey.maskedKey}
        </z-text>
      </div>
      <z-row gap="2" alignsX="end">
        <z-button kind="outline" size="sm" onClick={copyKey}>{copyLabel}</z-button>
        <z-button kind="ghost" size="sm" tone="danger">Revoke</z-button>
      </z-row>
    </z-list-row>
  )
}

export const Example = () => {
  const keyRows = API_KEYS.map((apiKey) => <ApiKeyRow key={apiKey.name} apiKey={apiKey} />)

  return (
    <z-card gap="0" style={{ width: 'min(38rem, 100%)', padding: '0' }}>
      <z-row
        alignsX="between"
        alignsY="center"
        gap="3"
        style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-default)' }}
      >
        <z-column gap="1">
          <z-heading size="xs" tag="h2">API keys</z-heading>
          <z-text size="sm" color="muted">Keep these secret. Revoke any that leak.</z-text>
        </z-column>
        <z-button tone="secondary" size="sm">Create key</z-button>
      </z-row>
      <z-list isPlain aria-label="API keys">
        {keyRows}
      </z-list>
    </z-card>
  )
}
