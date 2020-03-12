const collection = 'Tv_Shows'
const { ObjectId } = require('mongodb')

class Controller {
  static create(req, res, next) {
    const TvShow = req.db.collection(collection)
    TvShow.insertOne({
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

  static getTvShowList(req, res, next) {
    const TvShow = req.db.collection(collection)
    TvShow.find({})
      .toArray()
      .then((tvShows) => {
        res.json(tvShows)
      })
      .catch((err) => {
        next(err)
      })
  }

  static getTvShow(req, res, next) {
    const TvShow = req.db.collection(collection)
    TvShow.findOne({
      _id: ObjectId(req.params.id)
    })
      .then((tvShow) => {
        res.json(tvShow)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const TvShow = req.db.collection(collection)
    TvShow.findOne({
      _id: ObjectId(req.params.id)
    })
      .then((tvShow) => {
        return TvShow.updateOne(
          {
            _id: ObjectId(req.params.id)
          },
          {
            $set: {
              title: req.body.title || tvShow.title,
              overview: req.body.overview || tvShow.overview,
              poster_path: req.body.poster_path || tvShow.poster_path,
              popularity: req.body.popularity || tvShow.popularity,
              tags: req.body.tags || tvShow.tags
            }
          }
        )
      })
      .then((result) => {
        // console.log({ update: result })
        res.json({ updated_data: req.body })
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    const TvShow = req.db.collection(collection)
    TvShow.deleteOne({
      _id: ObjectId(req.params.id)
    })
      .then((result) => {
        console.log({ delete: result })
        res.json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
