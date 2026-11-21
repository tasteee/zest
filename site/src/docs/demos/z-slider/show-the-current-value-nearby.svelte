<script lang="ts">
  import '@tasteee/zest'

  let brightness = $state(64)
</script>

<z-row gap="3" aligns-y="center">
  <z-slider
    label="Brightness"
    min="0"
    max="100"
    value={brightness}
    oninput={(event: CustomEvent<{ value: number }>) => (brightness = event.detail.value)}
  ></z-slider>
  <z-text style="width: 3rem">{brightness}%</z-text>
</z-row>
