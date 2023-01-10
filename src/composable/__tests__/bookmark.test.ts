import * as bookmark from '../bookmark'
import { describe, expect, it, beforeEach } from 'vitest'

describe('Bookmark', () => {
  beforeEach(() => {
    localStorage.clear()
    bookmark.resetBookmarks()
  })

  describe('loadBookmark', () => {
    it('should load bookmarks from storage', async () => {
      const dummyData: number[] = []

      localStorage.setItem(bookmark.BOOKMARK_KEY, JSON.stringify(dummyData))

      expect(bookmark.loadBookmark().value).toEqual(dummyData)
    })

    it('should load empty bookmark if it is not exist yet', async () => {
      const dummyData: number[] = []

      expect(localStorage.getItem(bookmark.BOOKMARK_KEY)).toBe(null)

      expect(bookmark.loadBookmark().value).toEqual(dummyData)
    })
  })

  describe('saveBookmarks', () => {
    it('should save bookmarks to storage', async () => {
      const dummyData: number[] = [1, 2, 3]

      bookmark.setBookmarks(dummyData)
      bookmark.saveBookmarks()

      expect(localStorage.getItem(bookmark.BOOKMARK_KEY)).toBe(
        JSON.stringify(dummyData)
      )
    })
  })

  describe('addBookmark', () => {
    it('should add id to bookmarks', async () => {
      const dummyData: number[] = []

      bookmark.setBookmarks(dummyData)
      bookmark.addBookmark(20)

      expect(localStorage.getItem(bookmark.BOOKMARK_KEY)).toBe(
        JSON.stringify([20])
      )
    })

    it('should not add duplicates bookmarks', async () => {
      const dummyData: number[] = [20]

      bookmark.setBookmarks(dummyData)
      bookmark.addBookmark(20)

      expect(localStorage.getItem(bookmark.BOOKMARK_KEY)).toBe(
        JSON.stringify([20])
      )
    })
  })
})
