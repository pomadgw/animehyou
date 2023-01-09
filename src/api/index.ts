import { request, gql, Variables } from 'graphql-request'
import { PageResult } from '../types'

const listAnimeQuery = gql`
  query (
    $id: Int
    $page: Int
    $perPage: Int
    $search: String
    $format_in: [MediaFormat]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        id: $id
        search: $search
        sort: [TRENDING_DESC]
        format_in: $format_in
      ) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        description
        averageScore
        genres
        seasonYear
        status
      }
    }
  }
`

const listGenresQuery = gql`
  query {
    GenreCollection
  }
`

export async function getAnimeList(variables?: Variables): Promise<PageResult> {
  return await request('https://graphql.anilist.co', listAnimeQuery, {
    format_in: ['TV'],
    ...(variables ?? {})
  })
}

export async function getGenres(variables?: Variables): Promise<PageResult> {
  return await request('https://graphql.anilist.co', listGenresQuery)
}
