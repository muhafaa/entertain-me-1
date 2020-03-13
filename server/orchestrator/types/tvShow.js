const { gql } = require('apollo-server')

const tvShowTypes = gql`
  type TvShow {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    tvShows(id: ID, title: String): [TvShow]
  }

  extend type Mutation {
    addTvShow(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): TvShow

    updateTvShow(
      id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): TvShow

    deleteTvShow(id: ID): TvShow
  }
`

module.exports = tvShowTypes
