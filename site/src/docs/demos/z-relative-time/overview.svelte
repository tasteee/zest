<script lang="ts">
  import '@tasteee/zest'

  const getTimeAgo = (milliseconds: number): string => new Date(Date.now() - milliseconds).toISOString()

  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  const sentAt = getTimeAgo(20 * SECOND)
  const editedAt = getTimeAgo(4 * MINUTE)
  const lastSeenAt = getTimeAgo(3 * HOUR)
  const joinedAt = getTimeAgo(40 * DAY)
</script>

<z-column gap="2">
  <z-row gap="2" aligns-y="center">
    <z-text color="muted">Sent</z-text>
    <z-relative-time datetime={sentAt}></z-relative-time>
  </z-row>
  <z-row gap="2" aligns-y="center">
    <z-text color="muted">Edited</z-text>
    <z-relative-time datetime={editedAt}></z-relative-time>
  </z-row>
  <z-row gap="2" aligns-y="center">
    <z-text color="muted">Last seen</z-text>
    <z-relative-time datetime={lastSeenAt}></z-relative-time>
  </z-row>
  <z-row gap="2" aligns-y="center">
    <z-text color="muted">Joined</z-text>
    <z-relative-time datetime={joinedAt}></z-relative-time>
  </z-row>
</z-column>
