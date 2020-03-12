const router = require('express').Router()

// routes
const tvShow = require('./tvShow')

router.use('/tv-shows', tvShow)

module.exports = router
