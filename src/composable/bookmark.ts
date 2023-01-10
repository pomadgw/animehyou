import { Ref, onMounted, ref } from 'vue'

type Nullable<T> = T | null

export const BOOKMARK_KEY = 'bookmark'

type Bookmark = number[]

const bookmarkInstance = ref<Bookmark>([])

export function resetBookmarks(): void {
  bookmarkInstance.value = []
}

export function setBookmarks(bookmark: Bookmark): void {
  bookmarkInstance.value = bookmark
}

export function loadBookmark(): Ref<Bookmark> {
  const bookmarksInJSON: Nullable<string> =
    global.localStorage.getItem(BOOKMARK_KEY)

  if (bookmarksInJSON === null) {
    global.localStorage.setItem(
      BOOKMARK_KEY,
      JSON.stringify(bookmarkInstance.value)
    )
  } else {
    bookmarkInstance.value = JSON.parse(bookmarksInJSON)
  }

  return bookmarkInstance
}

export function saveBookmarks(): void {
  global.localStorage.setItem(
    BOOKMARK_KEY,
    JSON.stringify(bookmarkInstance.value)
  )
}

export function addBookmark(id: number): void {
  if (!bookmarkInstance.value.includes(id)) bookmarkInstance.value.push(id)
  saveBookmarks()
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useBookmark() {
  onMounted(loadBookmark)

  return {
    addBookmark,
    bookmarks: bookmarkInstance
  }
}
