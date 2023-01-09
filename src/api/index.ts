import { request, gql, Variables } from 'graphql-request'
import { PageResult } from '../types'

const query = gql`
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

export async function getAnimeList(variables?: Variables): Promise<PageResult> {
  return await request('https://graphql.anilist.co', query, {
    format_in: ['TV'],
    ...(variables ?? {})
  })
}
