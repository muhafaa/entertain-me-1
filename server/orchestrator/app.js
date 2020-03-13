const { ApolloServer } = require('apollo-server')

const { typeDefs } = require('./types')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.listen().then(({ url }) => {
  console.log('server started', url)
})
