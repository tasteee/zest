import '@tasteee/zest'

const getTimeAgo = (milliseconds: number): string => new Date(Date.now() - milliseconds).toISOString()

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export const Example = () => {
  const sentAt = getTimeAgo(20 * SECOND)
  const editedAt = getTimeAgo(4 * MINUTE)
  const lastSeenAt = getTimeAgo(3 * HOUR)
  const joinedAt = getTimeAgo(40 * DAY)

  return (
    <z-column gap="2">
      <z-row gap="2" alignsY="center">
        <z-text color="muted">Sent</z-text>
        <z-relative-time datetime={sentAt} />
      </z-row>
      <z-row gap="2" alignsY="center">
        <z-text color="muted">Edited</z-text>
        <z-relative-time datetime={editedAt} />
      </z-row>
      <z-row gap="2" alignsY="center">
        <z-text color="muted">Last seen</z-text>
        <z-relative-time datetime={lastSeenAt} />
      </z-row>
      <z-row gap="2" alignsY="center">
        <z-text color="muted">Joined</z-text>
        <z-relative-time datetime={joinedAt} />
      </z-row>
    </z-column>
  )
}
