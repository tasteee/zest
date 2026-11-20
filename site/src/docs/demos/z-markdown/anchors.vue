<script setup lang="ts">
import '@tasteee/zest'

const CONTENT = `## Install

Add the package.

## Usage

Import it once.`
</script>

<template>
  <z-markdown has-heading-anchors :content="CONTENT"></z-markdown>
</template>
