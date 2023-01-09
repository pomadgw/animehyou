<script setup lang="ts">
import Navbar from './components/NavBar.vue'
</script>

<template>
  <div class="font-sans">
    <Navbar />
    <div class="px-10 pt-10 pb-20 max-w-screen-2xl m-auto">
      <router-view />
    </div>
  </div>
</template>
