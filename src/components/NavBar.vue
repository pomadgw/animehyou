<template>
  <nav class="py-4 px-6 flex items-center flex-col md:flex-row">
    <img src="/icon.png" alt="Animehyou logo" class="w-12 md:mr-3" />
    <div class="text-3xl font-bold mt-3 md:mt-0">Animehyou</div>

    <ul class="flex md:ml-6">
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
