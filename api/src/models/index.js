const config = require('config')
const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect(config.mongodb)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => {
  console.log(`connected to ${config.mongodb}`)
})

module.exports.Test = require('./test')({ model: 'Test', mongoose })
module.exports.User = require('./user')({ model: 'User', mongoose })
module.exports.Contact = require('./contact')({ model: 'Contact', mongoose })
module.exports.UserContact = require('./user-contact')({ model: 'UserContact', mongoose })
