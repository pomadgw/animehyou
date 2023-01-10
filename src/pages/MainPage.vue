<template>
  <div class="mb-6 flex justify-end">
    <div class="flex items-center">
      <label class="mr-6">Filter</label>
      <MultiSelect
        v-model="selectedGenres"
        :options="genresList"
        mode="tags"
        style="width: 256px"
      />
    </div>
  </div>
  <div
    v-if="page"
    ref="scrollComponent"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
  >
    <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import MultiSelect from '@vueform/multiselect'

import AnimeCard from '../components/AnimeCard.vue'
import { getGenres } from '../api'
import useScroll from '../composable/scroll'
import useAnime from '../composable/anime'

const genresList = ref<string[]>([])

const { page, animeList, loadListofAnime } = useAnime()

const selectedGenres = ref<string[]>([])
const scrollComponent = ref<HTMLElement | null>(null)

onMounted(async () => {
  await loadListofAnime({}, true)
  genresList.value = await getGenres()
})

watch(selectedGenres, () => {
  const additionalvariables =
    genresList.value.length > 0 ? { genres: genresList.value } : {}
  loadListofAnime(additionalvariables, true)
})

useScroll(() => {
  const element = scrollComponent.value
  if (element != null) {
    if (element.getBoundingClientRect().bottom - 200 < window.innerHeight) {
      loadListofAnime({})
    }
  }
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
