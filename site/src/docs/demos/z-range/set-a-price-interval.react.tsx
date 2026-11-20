import '@tasteee/zest'

const PRICE_RANGE = [200, 750]
const HANDLES = [{ label: 'Minimum price' }, { label: 'Maximum price', tone: 'tertiary' }]

export const Example = () => (
  <z-range
    value={PRICE_RANGE}
    handles={HANDLES}
    min={0}
    max={1000}
    label="Price"
    doesShowValue
    valuePrefix="$"
  />
)
