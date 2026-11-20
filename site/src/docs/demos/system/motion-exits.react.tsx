import { toaster } from '@tasteee/zest'

const showToast = () => {
  toaster.show({ title: 'Toasts fold away', description: 'The stack glides closed behind them.', tone: 'info' })
}

export const Example = () => (
  <z-row gap="3" doesWrap alignsX="center">
    <z-sheet heading="Sheet" description="Slides out the way it came, whether you press ×, Esc, or the backdrop.">
      <z-button slot="trigger" kind="outline">Open a sheet</z-button>
      <z-text size="sm" color="muted">Close me any way you like.</z-text>
    </z-sheet>

    <z-dialog heading="Dialog" description="Rises in, retraces the same path out, a little faster.">
      <z-button slot="trigger" kind="outline">Open a dialog</z-button>
    </z-dialog>

    <z-popover placement="bottom">
      <z-button slot="trigger" kind="outline">Open a popover</z-button>
      <z-text size="sm">Scales in from its anchor side.</z-text>
    </z-popover>

    <z-menu>
      <z-button slot="trigger" kind="outline">Open a menu</z-button>
      <z-menu-item value="one">Pick me</z-menu-item>
      <z-menu-item value="two">Or me</z-menu-item>
    </z-menu>

    <z-button kind="outline" onClick={showToast}>Show a toast</z-button>
  </z-row>
)
