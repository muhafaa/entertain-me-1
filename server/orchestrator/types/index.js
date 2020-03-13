const { gql } = require('apollo-server')

const movieType = require('./movie')
const tvShowType = require('./tvShow')

const typeDef = gql`
  type Query
  type Mutation
`

module.exports = {
  typeDefs: [typeDef, movieType, tvShowType]
}
