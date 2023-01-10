<template>
  <div v-if="detail">
    <h1 class="text-3xl font-bold mb-6">{{ detail.title.english }}</h1>

    <div class="flex flex-col md:flex-row">
      <div class="md:mr-10">
        <img :src="detail.coverImage.extraLarge" :alt="detail.title.english" />
      </div>

      <div class="mt-6 md:mt-0">
        <EntryList :value="detail.title.english" label="Title" />
        <EntryList :value="detail.title.native" label="Title (Japanese)" />
        <EntryList :html="detail.description" label="Description" />

        <EntryList :value="detail.seasonYear.toString()" label="Year" />
        <EntryList
          :value="detail.averageScore ? detail.averageScore.toString() : '-'"
          label="Average score"
        />
        <EntryList :value="detail.genres.join(', ')" label="Genres" />
        <EntryList :value="getStatusName(detail.status)" label="Status" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EntryList from '../components/EntryList.vue'
import { getAnimeList } from '../api'
import { Media, MediaStatus } from '../types'

const detail = ref<Media | null>(null)

const props = defineProps<{ id: string }>()

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
  const page = await getAnimeList({ id: props.id })
  detail.value = page.Page.media[0]
})
</script>
