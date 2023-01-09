import { onMounted } from 'vue'

type Nullable<T> = T | null

export const BOOKMARK_KEY = 'bookmark'

type Bookmark = number[]

let bookmarkInstance: Bookmark = []

export function resetBookmarks(): void {
  bookmarkInstance = []
}

export function setBookmarks(bookmark: Bookmark): void {
  bookmarkInstance = bookmark
}

export function loadBookmark(): Bookmark {
  const bookmarksInJSON: Nullable<string> =
    global.localStorage.getItem(BOOKMARK_KEY)

  if (bookmarksInJSON === null) {
    global.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarkInstance))
  } else {
    bookmarkInstance = JSON.parse(bookmarksInJSON)
  }

  return bookmarkInstance
}

export function saveBookmarks(): void {
  global.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarkInstance))
}

export function addBookmark(id: number): void {
  bookmarkInstance.push(id)
  saveBookmarks()
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useBookmark() {
  onMounted(loadBookmark)

  return {
    addBookmark
  }
}
