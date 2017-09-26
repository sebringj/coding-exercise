module.exports = params => {

  const { mongoose, model } = params

  const schema = mongoose.Schema({
    user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    contact: { type : mongoose.Schema.Types.ObjectId, ref : 'Contact' }
  })

  return mongoose.model(model, schema)
}
