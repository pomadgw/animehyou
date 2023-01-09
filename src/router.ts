import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './pages/MainPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: MainPage }]
})
