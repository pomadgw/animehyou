import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage.vue'
import AnimeDetailPage from './pages/AnimeDetailPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/anime/:id', props: true, component: AnimeDetailPage }
  ]
})
