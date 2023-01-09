<script setup lang="ts">
import Navbar from './components/NavBar.vue'
import { getAnimeList } from './api'

getAnimeList()
</script>

<template>
  <div class="font-sans">
    <Navbar />
    <router-view />
  </div>
</template>
