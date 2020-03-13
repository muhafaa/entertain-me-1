const { gql } = require('apollo-server')

const movieTypes = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies(id: ID, title: String): [Movie]
  }

  extend type Mutation {
    addMovie(
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie

    updateMovie(
      id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ): Movie

    deleteMovie(id: ID): Movie
  }
`

module.exports = movieTypes
