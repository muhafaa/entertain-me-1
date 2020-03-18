import { gql } from 'apollo-boost'

const GET_TVSHOW_LIST = gql`
  {
    tvShows {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export { GET_TVSHOW_LIST }
