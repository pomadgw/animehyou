import { request, gql } from 'graphql-request'
import { Page } from '../types'

const query = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search) {
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
        seasonYear
        status
      }
    }
  }
`

export async function getAnimeList(): Promise<Page> {
  return await request('https://graphql.anilist.co', query)
}
