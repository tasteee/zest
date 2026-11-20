<script setup lang="ts">
import '@tasteee/zest'

const SESSION = `$ git clone https://github.com/tasteee/zest.git
$ cd zest && pnpm install
Lockfile is up to date
Select any part of a line, then use "Copy selection".`
</script>

<template>
  <z-terminal shell="bash" copy-lines="1-2,4" :code="SESSION"></z-terminal>
</template>
