<script lang="ts">
  import '@tasteee/zest'

  const SESSION = `$ pnpm add @tasteee/zest
Packages: +1
$ pnpm build
Built in 2.4s`
</script>

<z-terminal shell="zsh" cwd="~/my-app" does-animate does-loop code={SESSION}></z-terminal>
