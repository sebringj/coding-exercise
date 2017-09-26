module.exports = params => {

  const { mongoose, model } = params

  const schema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: String,
    contactType: String,
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      postalCode: String
    },
    phones: [{}]
  })

  return mongoose.model(model, schema)
}
