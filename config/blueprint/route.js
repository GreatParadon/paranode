const express = require('express')
const RouteController = require('./AppRoute-controller')

// const apiMiddleware = require('../middleware/api.auth');

const router = express.Router()

router.get('/AppRoute', RouteController.list)

router.get('/AppRoute/:id', RouteController.get)

router.post('/AppRoute', RouteController.store)

router.put('/AppRoute/:id', RouteController.update)

router.delete('/AppRoute/:id', RouteController.destroy)

module.exports = router
