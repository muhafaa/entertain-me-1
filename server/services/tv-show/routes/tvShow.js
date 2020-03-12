const router = require('express').Router()

const Controller = require('../controllers/tvShow')

router.post('/', Controller.create)

router.get('/', Controller.getTvShowList)

router.get('/:id', Controller.getTvShow)

router.put('/:id', Controller.update)

router.delete('/:id', Controller.delete)

module.exports = router
