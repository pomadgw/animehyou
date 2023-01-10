import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useLoading() {
  const isLoading = ref(true)

  async function wrapLoadingState<T>(func: () => Promise<T>): Promise<T> {
    isLoading.value = true
    const result = await func()
    isLoading.value = false

    return result
  }

  return {
    isLoading,
    wrapLoadingState
  }
}
