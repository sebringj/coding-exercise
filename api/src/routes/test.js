const express = require('express')
const router = express.Router()
const models = require('../models')

const LIMIT = 20

router.get('/', async (req, res) => {
  const skip = isNaN(req.query.skip) ? 0 : parseInt(req.query.skip, 10)
  try {
    const results = await models.Test.find({}).limit(LIMIT).skip(skip).exec()
    res.json(results)
  } catch (err) {
    res.status(500).end('server error')
  }
})

router.post('/', async (req, res) => {
  let name = req.body.name
  if (typeof name !== 'string' || name.trim() === '' || name.length > 50)
    return res.status(400).end('bad params')

  try {
    let test = new models.Test({ name })
    await test.save()
    res.json(test)
  } catch (err) {
    console.error(err)
    res.status(500).end('server error')
  }

})

router.put('/:id', async (req, res) => {
  res.status(501).end('not implmented')
})

router.delete('/:id', async (req, res) => {
  let _id = req.params.id
  if (typeof _id !== 'string')
    return res.status(400).end('bad params')

  try {
    await models.Test.remove({ _id }).exec()
    res.json({ msg: 'removed' })
  } catch (err) {
    console.error(err)
    res.status(500).end('server error')
  }
})

module.exports = router
