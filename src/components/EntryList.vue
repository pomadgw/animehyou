<template>
  <div class="flex mb-3 last:mb-0">
    <div class="mr-3 w-20 md:w-40">{{ props.label }}</div>
    <div v-if="html" class="flex-1" v-html="props.html" />
    <div v-else class="flex-1">{{ props.value }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value?: string
  html?: string
}>()
</script>
