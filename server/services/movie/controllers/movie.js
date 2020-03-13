const collection = 'Movies'
const { ObjectId } = require('mongodb')

class Controller {
  static create(req, res, next) {
    const Movie = req.db.collection(collection)
    Movie.insertOne({
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    })
      .then((result) => {
        // console.log({ create: result })
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getMovieList(req, res, next) {
    const Movie = req.db.collection(collection)
    Movie.find({})
      .toArray()
      .then((movies) => {
        res.json(movies)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getMovie(req, res, next) {
    const Movie = req.db.collection(collection)
    Movie.findOne({
      _id: ObjectId(req.params.id)
    })
      .then((movie) => {
        res.json(movie)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const Movie = req.db.collection(collection)
    Movie.findOne({
      _id: ObjectId(req.params.id)
    })
      .then((movie) => {
        return Movie.findOneAndUpdate(
          {
            _id: ObjectId(req.params.id)
          },
          {
            $set: {
              title: req.body.title || movie.title,
              overview: req.body.overview || movie.overview,
              poster_path: req.body.poster_path || movie.poster_path,
              popularity: req.body.popularity || movie.popularity,
              tags: req.body.tags || movie.tags
            }
          },
          {
            returnOriginal: false
          }
        )
      })
      .then((result) => {
        res.json(result.value)
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const Movie = req.db.collection(collection)
    let movie
    Movie.findOne({
      _id: ObjectId(req.params.id)
    })
      .then((result) => {
        movie = result
        return Movie.deleteOne({
          _id: ObjectId(req.params.id)
        })
      })
      .then(() => {
        res.json(movie)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
