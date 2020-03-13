const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const baseUrl = 'http://localhost:3001/movies'

const resolvers = {
  Query: {
    movies: async (parent, args, context) => {
      try {
        if (args.id) {
          const cachedMovie = await redis.get('movie')
          if (cachedMovie) {
            return [JSON.parse(cachedMovie)]
          }
          const { data } = await axios.get(baseUrl + '/' + args.id)
          await redis.set('movie', JSON.stringify(data))
          return [data]
        }

        const cachedMovies = await redis.get('movies')
        if (cachedMovies) {
          return JSON.parse(cachedMovies)
        }
        const { data } = await axios.get(baseUrl)
        await redis.set('movies', JSON.stringify(data))
        return data
      } catch (err) {
        res.status(500).json(err)
      }
    }
  },
  Mutation: {
    addMovie: async (parent, args, context) => {
      try {
        const { data } = await axios.post(baseUrl, args)
        await redis.del('movie')
        await redis.del('movies')
        return data.ops[0]
      } catch (err) {
        console.log(err)
      }
    },

    updateMovie: async (parent, args, context) => {
      try {
        const { data } = await axios.put(baseUrl + '/' + args.id, args)
        const updatedMovie = data
        await redis.del('movie')
        await redis.del('movies')
        return updatedMovie
      } catch (err) {
        console.log(err)
      }
    },

    deleteMovie: async (parent, args, context) => {
      try {
        const { data } = await axios.delete(baseUrl + '/' + args.id)
        const deletedMovie = data
        await redis.del('movie')
        await redis.del('movies')
        return deletedMovie
      } catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = resolvers
