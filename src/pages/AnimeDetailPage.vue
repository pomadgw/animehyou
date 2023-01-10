<template>
  <PageSpinner v-if="isLoading" />
  <div v-else-if="detail">
    <h1 class="text-3xl font-bold mb-6">{{ detail.title.english }}</h1>

    <div class="flex flex-col md:flex-row">
      <div class="md:mr-10">
        <img :src="detail.coverImage.extraLarge" :alt="detail.title.english" />
      </div>

      <div class="mt-6 md:mt-0">
        <EntryList
          :value="detail.title.english ?? detail.title.romaji"
          label="Title"
        />
        <EntryList :value="detail.title.native" label="Title (Japanese)" />
        <EntryList :html="detail.description" label="Description" />

        <EntryList :value="detail.seasonYear.toString()" label="Year" />
        <EntryList
          :value="detail.averageScore ? detail.averageScore.toString() : '-'"
          label="Average score"
        />
        <EntryList :value="detail.genres.join(', ')" label="Genres" />
        <EntryList :value="getStatusName(detail.status)" label="Status" />

        <button
          v-if="!isAlreadyInBookmark"
          class="border-gray-500 border block px-3 py-2 rounded mt-6"
          @click="addToBookmark"
        >
          Add to bookmark
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import EntryList from '../components/EntryList.vue'
import { getAnimeList } from '../api'
import { Media, MediaStatus } from '../types'
import PageSpinner from '../components/PageSpinner.vue'
import useBookmark from '../composable/bookmark'
import useLoading from '../composable/is-loading'

const { addBookmark, bookmarks } = useBookmark()

const detail = ref<Media | null>(null)
const { isLoading, wrapLoadingState } = useLoading()

const props = defineProps<{ id: string }>()

const isAlreadyInBookmark = computed(() =>
  bookmarks.value.includes(Number(props.id))
)

const addToBookmark = () => {
  addBookmark(Number(props.id))
  const title = detail?.value?.title
  if (title != null) {
    alert(`${title.english ?? title.romaji} has been added to bookmark`)
  }
}

const getStatusName = (status: MediaStatus): string => {
  switch (status) {
    case MediaStatus.FINISHED:
      return 'Finished'
    case MediaStatus.RELEASING:
      return 'Ongoing'
    case MediaStatus.CANCELLED:
      return 'Cancelled'
    case MediaStatus.HIATUS:
      return 'On Hiatus'
    case MediaStatus.NOT_YET_RELEASED:
      return 'Not yet releaded'
    default:
      return ''
  }
}

onMounted(async () => {
  wrapLoadingState(async () => {
    const page = await getAnimeList({ id: props.id })
    detail.value = page.Page.media[0]
  })
})
</script>
