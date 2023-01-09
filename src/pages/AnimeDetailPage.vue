<template>
  <div v-if="detail">
    <div class="flex flex-col">
      <div>
        <img :src="detail.coverImage.extraLarge" :alt="detail.title.english" />
      </div>

      <div>
        <div>Name</div>
        <div>{{ detail.title.english }}</div>

        <div>Description</div>
        <div v-html="detail.description" />

        <div>Average score</div>
        <div>{{ detail.averageScore }}</div>

        <div>Genres</div>
        <div>{{ detail.genres }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAnimeList } from '../api'
import { Media } from '../types'

const detail = ref<Media | null>(null)

const props = defineProps({ id: String })

onMounted(async () => {
  const page = await getAnimeList({ id: props.id })
  detail.value = page.Page.media[0]
})
</script>
