const router = require('express').Router()

const Controller = require('../controllers/movie')

router.post('/', Controller.create)

router.get('/', Controller.getMovieList)

router.get('/:id', Controller.getMovie)

router.put('/:id', Controller.update)

router.delete('/:id', Controller.delete)

module.exports = router
