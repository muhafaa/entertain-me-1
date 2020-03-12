const router = require('express').Router()

const movie = require('./movie')

router.use('/movies', movie)

module.exports = router
