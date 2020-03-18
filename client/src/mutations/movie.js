import { gql } from 'apollo-boost'

const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addMovie(
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

const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $_id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    updateMovie(
      _id: $_id
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

const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export { ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE }
