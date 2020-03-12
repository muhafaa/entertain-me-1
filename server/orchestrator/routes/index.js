const router = require('express').Router()

const movie = require('./movie')

const tvShow = require('./tvShow')

router.use('/movies', movie)

router.use('/tv-shows', tvShow)

module.exports = router
