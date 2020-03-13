const { merge } = require('lodash')

const movieResolver = require('./movie')
const tvShowResolver = require('./tvShow')

const resolvers = merge(movieResolver, tvShowResolver)

module.exports = resolvers
