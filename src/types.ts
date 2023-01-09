export interface PageResult {
  Page: Page
}

export interface Page {
  pageInfo: PageInfo
  media: Media[]
}

interface PageInfo {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
}

export interface Media {
  id: number
  title: MediaTitle
  coverImage: MediaCoverImage
  seasonYear: number
  status: string
}

interface MediaTitle {
  romaji: string
  english: string
  native?: string
}

interface MediaCoverImage {
  extraLarge: string
  large: string
  medium: string
  color: string
}
