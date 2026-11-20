import { toaster } from '@tasteee/zest'

// a string is enough. It's also the toast's id, so mashing the button
// refreshes one toast instead of stacking copies
const showSaved = () => toaster.show('Changes saved')

const showSuccess = () => {
  toaster.show({ title: 'Deployed', description: 'zest-docs is live on production.', tone: 'success' })
}

const showInfo = () => {
  toaster.show({ title: 'New comment', description: 'Ada left feedback on “Motion”.', tone: 'info' })
}

const showWarning = () => {
  toaster.show({ title: 'Storage almost full', description: '92% of 10 GB used.', tone: 'warning' })
}

const showDanger = () => {
  toaster.show({ title: 'Payment failed', description: 'Update the card on file.', tone: 'danger', duration: 6000 })
}

export const Example = () => (
  <z-row gap="2" does-wrap="" aligns-x="center">
    <z-button kind="outline" onClick={showSaved}>Saved</z-button>
    <z-button kind="outline" onClick={showSuccess}>Success</z-button>
    <z-button kind="outline" onClick={showInfo}>Info</z-button>
    <z-button kind="outline" onClick={showWarning}>Warning</z-button>
    <z-button kind="outline" onClick={showDanger}>Danger</z-button>
  </z-row>
)
