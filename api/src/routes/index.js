const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ msg: 'ok'})
})
router.use('/test', require('./test'))
router.use('/contact', require('./contact'))

module.exports = router
