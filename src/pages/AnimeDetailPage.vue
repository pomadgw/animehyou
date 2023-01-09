<template>
  <div>
    {{ props.id }}
  </div>
</template>
<script setup lang="ts">
// import { getAnimeList } from '../api'

const props = defineProps({ id: String })
</script>
