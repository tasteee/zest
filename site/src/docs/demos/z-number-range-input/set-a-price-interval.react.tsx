import '@tasteee/zest'

const PRICE_RANGE = [20, 120]

export const Example = () => (
  <z-field label="Price" style={{ width: 'min(22rem, 100%)' }}>
    <z-number-range-input
      value={PRICE_RANGE}
      min={0}
      max={500}
      step={5}
      hasStepperButtons
      valuePrefix="$"
    />
  </z-field>
)
