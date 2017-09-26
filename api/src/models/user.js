module.exports = params => {

  const { mongoose, model } = params

  const schema = mongoose.Schema({
    name: { type: String, required: true },
  })

  return mongoose.model(model, schema)
}
