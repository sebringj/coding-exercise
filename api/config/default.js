let config = {
  port: process.env.PORT,
  mongodb: process.env.MONGODB
}

for (let key of Object.keys(config))
  if (typeof config[key] === 'undefined')
    throw `configuration error: ${key} is undefined`

module.exports = config
