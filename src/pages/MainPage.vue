<template>
  <div
    v-if="page"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
  >
    <AnimeCard v-for="anime in page" :key="anime.id" :anime="anime" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AnimeCard from '../components/AnimeCard.vue'
import { getAnimeList } from '../api'
import { Media } from '../types'

const page = ref<Media[]>([])

onMounted(async () => {
  const pageResult = await getAnimeList()
  page.value = page.value.concat(pageResult.Page.media)
})
</script>
