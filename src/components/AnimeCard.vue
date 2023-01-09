<template>
  <div
    :style="{ '--cover-image': `url(${anime.coverImage.large})` }"
    class="h-96 bg-red-200 bg-cover gradient-overlay flex items-end p-3"
  >
    {{ anime.title.english }}
  </div>
</template>
<script setup lang="ts">
import { Media } from '../types'

defineProps<{
  anime: Media
}>()
</script>

<style scoped>
.gradient-overlay {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(244, 244, 244, 0.83)
    ),
    var(--cover-image);
}
</style>
