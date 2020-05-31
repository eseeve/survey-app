const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const questionSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    options: [String],
  }
)

const surveySchema = new mongoose.Schema(
  {
    name: String,
    questions: [questionSchema]
  }
)

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

surveySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Survey', surveySchema)