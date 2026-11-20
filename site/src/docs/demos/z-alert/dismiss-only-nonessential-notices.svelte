<script lang="ts">
  import '@tasteee/zest'

  let isNoticeHidden = $state(false)
  let log = $state('dismiss not fired yet')

  const handleDismiss = () => {
    isNoticeHidden = true
    log = 'dismiss → preference saved'
  }

  const handleRestore = () => {
    isNoticeHidden = false
    log = 'dismiss not fired yet'
  }
</script>

<z-column gap="3" style="width: min(30rem, 100%)">
  <z-alert
    tone="secondary"
    heading="What’s new in 0.6"
    is-dismissable
    isHidden={isNoticeHidden}
    ondismiss={handleDismiss}
  >
    Menus confirm your pick with a quick flash before closing.
  </z-alert>
  <z-row gap="3" aligns-y="center">
    <z-text size="xs" color="muted" style="font-family: var(--font-mono)">{log}</z-text>
    <z-button size="sm" kind="plain" onclick={handleRestore}>Restore</z-button>
  </z-row>
</z-column>
