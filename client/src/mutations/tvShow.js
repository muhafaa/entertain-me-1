import { gql } from 'apollo-boost'

const ADD_TV_SHOW = gql`
  mutation AddTvShow(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addTvShow(
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const UPDATE_TV_SHOW = gql`
  mutation UpdateTvShow(
    $_id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    UpdateTvShow(
      id: $_id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const DELETE_TV_SHOW = gql`
  mutation DeleteTvShow($id: ID!) {
    deleteTvShow(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export { ADD_TV_SHOW, UPDATE_TV_SHOW, DELETE_TV_SHOW }
