<template>
  <div v-if="detail">
    <h1 class="text-3xl font-bold mb-6">{{ detail.title.english }}</h1>

    <div class="flex flex-col md:flex-row">
      <div class="md:mr-10">
        <img :src="detail.coverImage.extraLarge" :alt="detail.title.english" />
      </div>

      <div class="mt-6 md:mt-0">
        <EntryList :value="detail.title.english" label="Name" />
        <EntryList :html="detail.description" label="Description" />

        <EntryList :value="`${detail.averageScore}`" label="Average score" />
        <EntryList :value="detail.genres.join(', ')" label="Genres" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EntryList from '../components/EntryList.vue'
import { getAnimeList } from '../api'
import { Media } from '../types'

const detail = ref<Media | null>(null)

const props = defineProps<{ id: string }>()

onMounted(async () => {
  const page = await getAnimeList({ id: props.id })
  detail.value = page.Page.media[0]
})
</script>
