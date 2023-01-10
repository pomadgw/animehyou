<template>
  <PageSpinner v-if="isLoading" />
  <div v-else>
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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageSpinner from '../components/PageSpinner.vue'

import AnimeCard from '../components/AnimeCard.vue'
import useScroll from '../composable/scroll'
import useBookmark from '../composable/bookmark'
import useAnime from '../composable/anime'
import useLoading from '../composable/is-loading'

const { page, animeList, loadListofAnime } = useAnime()

const scrollComponent = ref<HTMLElement | null>(null)
const { isLoading, wrapLoadingState } = useLoading()

const { bookmarks } = useBookmark()

onMounted(async () => {
  wrapLoadingState(async () => {
    await loadListofAnime(
      {
        id_in: bookmarks.value
      },
      true
    )
  })
})

useScroll(() => {
  const element = scrollComponent.value
  if (element != null) {
    if (element.getBoundingClientRect().bottom - 200 < window.innerHeight) {
      loadListofAnime({
        id_in: bookmarks.value
      })
    }
  }
})
</script>
