import { ref } from 'vue'
import debounce from 'lodash/debounce'
import { getAnimeList } from '../api'
import { Media, PageResult } from '../types'
import { Variables } from 'graphql-request'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useAnime() {
  const page = ref<PageResult | null>(null)
  const animeList = ref<Media[]>([])
  const pageNumber = ref(0)

  const loadListofAnime = debounce(
    async (variables: Variables, resetList: boolean = false) => {
      const variable = {
        page: 1,
        genres: undefined as string[] | undefined,
        ...variables
      }

      if (page.value?.Page.pageInfo.hasNextPage !== null && !resetList) {
        variable.page = pageNumber.value + 1
      }

      page.value = await getAnimeList(variable)
      animeList.value = resetList
        ? page.value.Page.media
        : animeList.value.concat(page.value.Page.media)
      pageNumber.value = page.value.Page.pageInfo.currentPage
    },
    1000
  )

  return {
    page,
    animeList,
    pageNumber,
    loadListofAnime
  }
}
