const axios = require('axios')
const baseUrl = 'http://localhost:3001/movies'

class Controller {
  static create(req, res, next) {
    axios({
      method: 'POST',
      url: baseUrl,
      data: req.body
    })
      .then(({ data }) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getMovieList(req, res, next) {
    axios({
      method: 'GET',
      url: baseUrl
    })
      .then(({ data }) => {
        const movies = data
        res.json(movies)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getMovie(req, res, next) {
    axios({
      method: 'GET',
      url: baseUrl + '/' + req.params.id
    })
      .then(({ data }) => {
        const movie = data
        res.json(movie)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    axios({
      method: 'PUT',
      url: baseUrl + '/' + req.params.id,
      data: req.body
    })
      .then(({ data }) => {
        res.json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    axios({
      method: 'DELETE',
      url: baseUrl + '/' + req.params.id,
      data: req.body
    })
      .then(({ data }) => {
        res.json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
