<template>
  <nav class="py-3 px-6">
    <div class="text-2xl font-bold">Animehyou</div>

    <ul>
      <li>
        <router-link to="/">Homepage</router-link>
        <!-- TODO: implement bookmark page -->
        <router-link to="/bookmark">Bookmark</router-link>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
