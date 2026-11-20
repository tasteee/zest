<script lang="ts">
  import '@tasteee/zest'

  const SESSION = `$ pnpm add @tasteee/zest
Packages: +1
Done in 1.2s

$ pnpm dev
Local: http://localhost:5173/`
</script>

<z-terminal shell="zsh" cwd="~/my-app" code={SESSION}></z-terminal>
