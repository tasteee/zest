<script setup lang="ts">
import { toaster } from '@tasteee/zest'

const TOAST_ID = 'upload'
const STEP_PERCENT = 20
const STEP_MS = 500

const showProgress = (percent: number) => {
  toaster.show({ id: TOAST_ID, title: 'Uploading report.pdf…', description: `${percent}%`, duration: Infinity })
}

const showFailure = () => {
  toaster.show({
    id: TOAST_ID,
    title: 'Upload failed',
    description: 'The file is over the 25 MB limit.',
    tone: 'danger',
    duration: 6000
  })
}

const showSuccess = () => {
  toaster.show({ id: TOAST_ID, title: 'Upload complete', description: 'report.pdf is ready to share.', tone: 'success' })
}

// one toast id follows the whole job, updating in place
const upload = (willFail: boolean) => {
  let percent = 0
  showProgress(percent)

  const tick = setInterval(() => {
    percent += STEP_PERCENT
    const hasFailed = willFail && percent >= 60
    const isComplete = percent >= 100

    if (hasFailed) {
      clearInterval(tick)
      return showFailure()
    }

    if (isComplete) {
      clearInterval(tick)
      return showSuccess()
    }

    showProgress(percent)
  }, STEP_MS)
}

const uploadFile = () => upload(false)
const uploadHugeFile = () => upload(true)
</script>

<template>
  <z-column gap="4" aligns-x="center">
    <z-text size="sm" color="muted" style="max-width: 36ch; text-align: center">
      One toast id follows the whole job: it updates in place from progress to result instead of stacking.
    </z-text>
    <z-row gap="2" does-wrap aligns-x="center">
      <z-button tone="secondary" @click="uploadFile">Upload file</z-button>
      <z-button kind="outline" @click="uploadHugeFile">Upload a huge file</z-button>
    </z-row>
  </z-column>
</template>
