const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const baseUrl = 'http://localhost:3002/tv-shows'

const resolvers = {
  Query: {
    tvShows: async (parent, args, context) => {
      try {
        if (args.id) {
          const cachedTvShow = await redis.get('tvShow')
          if (cachedTvShow) {
            return [JSON.parse(cachedTvShow)]
          }
          const { data } = await axios.get(baseUrl + '/' + args.id)
          await redis.set('tvShow', JSON.stringify(data))
          return [data]
        }

        const cachedTvShows = await redis.get('tvShows')
        if (cachedTvShows) {
          return JSON.parse(cachedTvShows)
        }
        const { data } = await axios.get(baseUrl)
        await redis.set('tvShows', JSON.stringify(data))
        return data
      } catch (err) {
        res.status(500).json(err)
      }
    }
  },
  Mutation: {
    addTvShow: async (parent, args, context) => {
      try {
        const { data } = await axios.post(baseUrl, args)
        await redis.del('tvShow')
        await redis.del('tvShows')
        return data.ops[0]
      } catch (err) {
        console.log(err)
      }
    },

    updateTvShow: async (parent, args, context) => {
      try {
        const { data } = await axios.put(baseUrl + '/' + args.id, args)
        const updatedTvShow = data
        await redis.del('tvShow')
        await redis.del('tvShows')
        return updatedTvShow
      } catch (err) {
        console.log(err)
      }
    },

    deleteTvShow: async (parent, args, context) => {
      try {
        const { data } = await axios.delete(baseUrl + '/' + args.id)
        const deletedTvShow = data
        await redis.del('tvShow')
        await redis.del('tvShows')
        return deletedTvShow
      } catch (err) {
        console.log(err)
      }
    }
  }
}

module.exports = resolvers
