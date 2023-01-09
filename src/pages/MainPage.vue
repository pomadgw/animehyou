<template>
  <div
    v-if="page"
    ref="scrollComponent"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
  >
    <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import debounce from 'lodash/debounce'

import AnimeCard from '../components/AnimeCard.vue'
import { getAnimeList } from '../api'
import useScroll from '../composable/scroll'
import { Media, PageResult } from '../types'

const page = ref<PageResult | null>(null)
const animeList = ref<Media[]>([])
const scrollComponent = ref<HTMLElement | null>(null)

const pageNumber = ref(0)

onMounted(async () => {
  page.value = await getAnimeList()
  animeList.value = animeList.value.concat(page.value.Page.media)
  pageNumber.value = page.value.Page.pageInfo.currentPage
})

const loadNewAnime = debounce(async () => {
  if (page.value?.Page.pageInfo.hasNextPage) {
    page.value = await getAnimeList({ page: pageNumber.value + 1 })
    animeList.value = animeList.value.concat(page.value.Page.media)
    pageNumber.value = page.value.Page.pageInfo.currentPage
  }
}, 1000)

useScroll(() => {
  const element = scrollComponent.value
  if (element != null) {
    if (element.getBoundingClientRect().bottom - 200 < window.innerHeight) {
      loadNewAnime()
    }
  }
})
</script>
