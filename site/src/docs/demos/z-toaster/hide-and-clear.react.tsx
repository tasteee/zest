import { useRef } from 'react'
import { toaster } from '@tasteee/zest'

const showThree = () => {
  toaster.show({ title: 'Imported 12 photos', tone: 'success' })
  toaster.show({ title: '3 duplicates skipped', tone: 'warning' })
  toaster.show({ title: 'Album “Lisbon” created', tone: 'info' })
}

// clear() hides everything; hide(id) hides one toast by id
const clearAll = () => toaster.clear()

export const Example = () => {
  const hideSyncToastRef = useRef<() => void>(() => {})

  // show() returns a function that hides exactly that toast
  const showPersistent = () => {
    hideSyncToastRef.current = toaster.show({ title: 'Syncing your library…', duration: Infinity })
  }

  const hidePersistent = () => hideSyncToastRef.current()

  return (
    <z-column gap="4" alignsX="center">
      <z-row gap="2" doesWrap alignsX="center">
        <z-button kind="outline" onClick={showPersistent}>Show a persistent toast</z-button>
        <z-button kind="outline" onClick={hidePersistent}>Hide it</z-button>
      </z-row>
      <z-row gap="2" doesWrap alignsX="center">
        <z-button kind="outline" onClick={showThree}>Show three</z-button>
        <z-button kind="plain" onClick={clearAll}>Clear all</z-button>
      </z-row>
    </z-column>
  )
}
