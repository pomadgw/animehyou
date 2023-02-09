import { PageResponse, Variable } from "@/types/anilist";

  const query = `
  query (
    $id: Int
    $id_in: [Int]
    $page: Int
    $perPage: Int
    $search: String
    $genres: [String]
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
        id_in: $id_in
        search: $search
        sort: [TRENDING_DESC]
        genre_in: $genres
        type: ANIME
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

export async function getList(variables: Variable): Promise<PageResponse> {
  const url = "https://graphql.anilist.co";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  return fetch(url, options).then((response) => response.json());
}
