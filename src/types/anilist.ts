export interface AnimeTitle {
  romaji: string
  english: string
  native: string
}

export interface AnimeCoverImage {
  extraLarge: string
  large: string
  medium: string
  color: string
}

export enum AnimeStatus {
  /// Has completed and is no longer being released
  FINISHED = 'FINISHED',

  /// Currently releasing
  RELEASING = 'RELEASING',

  /// To be released at a later date
  NOT_YET_RELEASED = 'NOT_YET_RELEASED',

  /// Ended before the work could be finished
  CANCELLED = 'CANCELLED',

  /// Version 2 only. Is currently paused from releasing and will resume at a later date
  HIATUS = 'HIATUS'
}

export interface Media {
  id: number
  title: AnimeTitle
  coverImage: AnimeCoverImage
  description: string
  averageScore: number
  genres: string[]
  seasonYear: number
  status: AnimeStatus
}

export interface PageInfo {
  total: number
  currentPage: number
  lastPage: number
  hasLastPage: boolean
  perPage: number
}

export interface Page {
  pageInfo: PageInfo
  media: Media[]
}

export interface PageResponse {
  data: {
    Page: Page
  }
}

export interface Variable {
  id?: number
  id_in?: number[]
  page?: number
  perPage?: number
  search?: String
  genres?: String[]
}
