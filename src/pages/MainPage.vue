<template>
  <PageSpinner v-if="isLoading" />
  <template v-else-if="page">
    <div class="mb-6 flex justify-end">
      <div class="flex items-center w-full md:w-auto">
        <label class="mr-6">Filter</label>
        <MultiSelect
          v-model="selectedGenres"
          :options="genresList"
          mode="tags"
          style="min-width: 256px"
        />
      </div>
    </div>
    <div
      ref="scrollComponent"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
    </div>
  </template>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import MultiSelect from '@vueform/multiselect'

import AnimeCard from '../components/AnimeCard.vue'
import PageSpinner from '../components/PageSpinner.vue'

import { getGenres } from '../api'
import useScroll from '../composable/scroll'
import useAnime from '../composable/anime'
import useLoading from '../composable/is-loading'

const genresList = ref<string[]>([])
const { isLoading, wrapLoadingState } = useLoading()

const { page, animeList, loadListofAnime } = useAnime()

const selectedGenres = ref<string[]>([])
const scrollComponent = ref<HTMLElement | null>(null)

const additionalVariables = computed(() => {
  return selectedGenres.value.length > 0 ? { genres: selectedGenres.value } : {}
})

onMounted(async () => {
  await wrapLoadingState(async () => {
    await loadListofAnime({}, true)
    genresList.value = await getGenres()
  })
})

watch(selectedGenres, async () => {
  await wrapLoadingState(async () => {
    loadListofAnime(additionalVariables.value, true)
  })
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
