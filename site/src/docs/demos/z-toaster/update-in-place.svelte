<script lang="ts">
  import { toaster } from '@tasteee/zest'

  const publish = () => {
    // the same id updates the toast in place and restarts its countdown
    toaster.show({ id: 'publish', title: 'Publishing…', duration: Infinity })

    setTimeout(() => {
      toaster.show({ id: 'publish', title: 'Published', description: 'Your post is live.', tone: 'success' })
    }, 1400)
  }
</script>

<z-button tone="secondary" onclick={publish}>Publish</z-button>
