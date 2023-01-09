<template>
  <nav class="py-4 px-6 flex items-center">
    <div class="mr-3">
      <img src="/icon.png" alt="Animehyou logo" class="w-12" />
    </div>
    <div class="text-3xl font-bold">Animehyou</div>

    <ul class="flex ml-6">
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
