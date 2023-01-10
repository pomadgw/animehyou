<template>
  <div class="mb-6">
    <h1 class="text-3xl font-bold mb-6">Bookmark</h1>
  </div>
  <div
    v-if="page"
    ref="scrollComponent"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
  >
    <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
  </div>
  <div v-else>No bookmark found.</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import debounce from 'lodash/debounce'

import AnimeCard from '../components/AnimeCard.vue'
import { getAnimeList } from '../api'
import useScroll from '../composable/scroll'
import useBookmark from '../composable/bookmark'
import { Media, PageResult } from '../types'

const page = ref<PageResult | null>(null)
const animeList = ref<Media[]>([])

const scrollComponent = ref<HTMLElement | null>(null)

const pageNumber = ref(0)

const { bookmarks } = useBookmark()

onMounted(async () => {
  await loadListofAnime()
})

const loadListofAnime = debounce(async (resetList = false) => {
  const variable = {
    page: 1,
    idn_id: bookmarks.value
  }

  if (bookmarks.value.length === 0) {
    return
  }

  if (page.value?.Page.pageInfo.hasNextPage && !resetList) {
    variable.page = pageNumber.value + 1
  }

  page.value = await getAnimeList(variable)
  animeList.value = resetList
    ? page.value.Page.media
    : animeList.value.concat(page.value.Page.media)
  pageNumber.value = page.value.Page.pageInfo.currentPage
}, 1000)

useScroll(() => {
  const element = scrollComponent.value
  if (element != null) {
    if (element.getBoundingClientRect().bottom - 200 < window.innerHeight) {
      loadListofAnime()
    }
  }
})
</script>
