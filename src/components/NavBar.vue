<template>
  <nav class="pt-4 px-6 flex items-center flex-col md:flex-row">
    <router-link to="/" class="flex items-center">
      <img src="/icon.png" alt="Animehyou logo" class="w-12 mr-3" />
      <div class="text-3xl font-bold">Animehyou</div>
    </router-link>

    <ul class="flex mt-3 md:mt-0 md:ml-6">
      <li>
        <router-link to="/">Homepage</router-link>
      </li>
      <li class="ml-3">
        <!-- TODO: implement bookmark page -->
        <router-link to="/bookmark">Bookmark</router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts"></script>
