<script lang="ts">
  import '@tasteee/zest'

  type ApiKeyT = { name: string; maskedKey: string; secret: string }

  const API_KEYS: ApiKeyT[] = [
    { name: 'Production', maskedKey: 'zk_live_••••••••3f9a', secret: 'zk_live_example3f9a' },
    { name: 'Staging', maskedKey: 'zk_test_••••••••71bc', secret: 'zk_test_example71bc' }
  ]

  let copiedName = $state('')

  const copyKey = async (apiKey: ApiKeyT) => {
    await navigator.clipboard.writeText(apiKey.secret)
    copiedName = apiKey.name
    setTimeout(() => (copiedName = ''), 1500)
  }
</script>

<z-card gap="0" style="width: min(38rem, 100%); padding: 0">
  <z-row aligns-x="between" aligns-y="center" gap="3" style="padding: 1.25rem; border-bottom: 1px solid var(--border-default)">
    <z-column gap="1">
      <z-heading size="xs" tag="h2">API keys</z-heading>
      <z-text size="sm" color="muted">Keep these secret. Revoke any that leak.</z-text>
    </z-column>
    <z-button tone="secondary" size="sm">Create key</z-button>
  </z-row>
  <z-list is-plain aria-label="API keys">
    {#each API_KEYS as apiKey (apiKey.name)}
      <z-list-row>
        <div style="flex: 1; min-width: 0">
          <z-text weight="600">{apiKey.name}</z-text>
          <z-text size="sm" color="muted" style="display: block; font-family: var(--font-mono)">{apiKey.maskedKey}</z-text>
        </div>
        <z-row gap="2" aligns-x="end">
          <z-button kind="outline" size="sm" onclick={() => copyKey(apiKey)}>
            {copiedName === apiKey.name ? 'Copied' : 'Copy'}
          </z-button>
          <z-button kind="ghost" size="sm" tone="danger">Revoke</z-button>
        </z-row>
      </z-list-row>
    {/each}
  </z-list>
</z-card>
