import { onMounted, onBeforeUnmount } from 'vue'

export default function useScroll(callback: (e: Event) => void): void {
  onMounted(() => {
    window.addEventListener('scroll', callback)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', callback)
  })
}
