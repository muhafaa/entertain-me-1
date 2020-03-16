import { gql } from 'apollo-boost'

export const GET_MOVIE_LIST = () => {
  return gql`
    movies {
        id
        title
    }
  `
}
