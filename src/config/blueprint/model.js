const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ModelSchema = new Schema({
  email: String,
  name: String,
}, {
  timestamps: true,
})

ModelSchema.methods.exampleMethod = (parameter) => {
  // Logic
}

const Model = mongoose.model('Model', ModelSchema)

module.exports = Model