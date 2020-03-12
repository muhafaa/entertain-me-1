const router = require('express').Router()

// routes
const movie = require('./movie')

router.use('/movies', movie)

module.exports = router
