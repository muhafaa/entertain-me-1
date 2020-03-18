import { gql } from 'apollo-boost'

const GET_MOVIE_LIST = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export { GET_MOVIE_LIST }
