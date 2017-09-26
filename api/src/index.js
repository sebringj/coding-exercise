require('dotenv').config()
const config = require('config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const models = require('./models')
const routes = require('./routes')

app
  .options('*', cors())
  .use(cors())
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
  .use(bodyParser.raw({ limit: '5mb' }))
  // security middleware inserted here
  .use(routes)

require('http').createServer(app).listen(config.port, function() {
  console.log('coding exercise API listening on port ' + this.address().port)
})
