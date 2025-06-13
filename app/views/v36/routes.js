const express = require('express')
const router = new express.Router()

router.use('/', (req, res, next) => {
  req.feature = req.originalUrl.split('/')[1] + '/' + req.originalUrl.split('/')[2] + '/' + req.originalUrl.split('/')[3] + '/' + req.originalUrl.split('/')[4]
  res.locals.feature = req.feature
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.redirect('../')
})

// provider manage your apprentices
router.use('/employer/dashboard', (req, res, next) => {
  require(`./employer/dashboard/routes`)(req, res, next);
})

// provider manage your apprentices
router.use('/provider/dashboard', (req, res, next) => {
  require(`./provider/dashboard/routes`)(req, res, next);
})

module.exports = router