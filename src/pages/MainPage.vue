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
import debounce from 'lodash/debounce'
import MultiSelect from '@vueform/multiselect'

import AnimeCard from '../components/AnimeCard.vue'
import { getAnimeList, getGenres } from '../api'
import useScroll from '../composable/scroll'
import { Media, PageResult } from '../types'

const page = ref<PageResult | null>(null)
const animeList = ref<Media[]>([])
const genresList = ref<string[]>([])

const selectedGenres = ref<string[]>([])
const scrollComponent = ref<HTMLElement | null>(null)

const pageNumber = ref(0)

onMounted(async () => {
  page.value = await getAnimeList()
  animeList.value = animeList.value.concat(page.value.Page.media)
  pageNumber.value = page.value.Page.pageInfo.currentPage

  genresList.value = await getGenres()
})

const loadNewAnime = debounce(async (resetList = false) => {
  const variable = {
    page: 1,
    genres: undefined as string[] | undefined
  }

  if (page.value?.Page.pageInfo.hasNextPage && !resetList) {
    variable.page = pageNumber.value + 1
  }

  if (selectedGenres.value.length > 0) {
    // add genres to filter the list
    variable.genres = selectedGenres.value
  }

  page.value = await getAnimeList(variable)
  animeList.value = resetList
    ? page.value.Page.media
    : animeList.value.concat(page.value.Page.media)
  pageNumber.value = page.value.Page.pageInfo.currentPage
}, 1000)

watch(selectedGenres, () => {
  loadNewAnime(true)
})

useScroll(() => {
  const element = scrollComponent.value
  if (element != null) {
    if (element.getBoundingClientRect().bottom - 200 < window.innerHeight) {
      loadNewAnime()
    }
  }
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
