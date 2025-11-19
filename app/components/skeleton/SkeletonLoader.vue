<template>
  <div
    class="animate-pulse bg-gray-200 rounded-lg"
    :style="{ width: width || '100%', height: height || '24px' }"
  />
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '24px'
  }
})
</script>
