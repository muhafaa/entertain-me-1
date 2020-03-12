const axios = require('axios')
const baseUrl = 'http://localhost:3001/movies'
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
  static async create(req, res, next) {
    try {
      const response = await axios.post(baseUrl, req.body)
      res.status(201).json(response.data)
      redis.del('movies')
      redis.del('movie')
    } catch (err) {
      next(err)
    }
  }

  static async getMovieList(req, res, next) {
    try {
      const movies = await redis.get('movies')
      if (movies) {
        res.json(JSON.parse(movies))
      } else {
        const { data } = await axios.get(baseUrl)
        const movieList = data
        res.json(movieList)
        redis.set('movies', JSON.stringify(movieList))
      }
    } catch (err) {
      next(err)
    }
  }

  static async getMovie(req, res, next) {
    try {
      let cachedMovie = await redis.get('movie')
      if (cachedMovie) {
        cachedMovie = JSON.parse(cachedMovie)
        if (cachedMovie.id == req.params.id) {
          res.json(cachedMovie)
        }
      } else {
        const { data } = await axios.get(baseUrl)
        const movie = data
        res.json(movie)
        redis.set('movie', JSON.stringify(movie))
      }
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const response = await axios.put(baseUrl + '/' + req.params.id, req.body)
      res.json(response.data)
      await redis.del('movie')
      await redis.del('movies')
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const response = axios.delete(baseUrl + '/' + req.params.id)
      res.json(response.data)
      redis.del('movie')
      redis.del('movies')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller
