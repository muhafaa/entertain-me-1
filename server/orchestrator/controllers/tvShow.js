const axios = require('axios')
const baseUrl = 'http://localhost:3002/tv-shows'
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
  static async create(req, res, next) {
    try {
      const response = await axios.post(baseUrl, req.body)
      res.status(201).json(response.data)
      redis.del('tvShows')
      redis.del('tvShow')
    } catch (err) {
      next(err)
    }
  }

  static async getTvShowList(req, res, next) {
    try {
      const tvShows = await redis.get('tvShows')
      if (tvShows) {
        res.json(JSON.parse(tvShows))
      } else {
        const { data } = await axios.get(baseUrl)
        const tvShowList = data
        res.json(tvShowList)
        redis.set('tvShows', JSON.stringify(tvShowList))
      }
    } catch (err) {
      next(err)
    }
  }

  static async getTvShow(req, res, next) {
    try {
      let cachedTvShow = await redis.get('tvShow')
      if (cachedTvShow) {
        cachedTvShow = JSON.parse(cachedTvShow)
        if (cachedTvShow.id == req.params.id) {
          res.json(cachedTvShow)
        }
      } else {
        const { data } = await axios.get(baseUrl)
        const tvShow = data
        res.json(tvShow)
        redis.set('tvShow', JSON.stringify(tvShow))
      }
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const response = await axios.put(baseUrl + '/' + req.params.id, req.body)
      res.json(response.data)
      await redis.del('tvShow')
      await redis.del('tvShows')
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const response = axios.delete(baseUrl + '/' + req.params.id)
      res.json(response.data)
      redis.del('tvShow')
      redis.del('tvShows')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller
