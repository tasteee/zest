import '@tasteee/zest'

const PRICE_RANGE = [200, 750]
const HANDLES = [{ label: 'Minimum price' }, { label: 'Maximum price', tone: 'tertiary' }]

export const Example = () => (
  <z-range
    prop:value={PRICE_RANGE}
    prop:handles={HANDLES}
    min="0"
    max="1000"
    label="Price"
    does-show-value=""
    value-prefix="$"
  />
)
