const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const questionSchema = new mongoose.Schema(
  {
    type: String,
    options: [String],
  }
)

const surveySchema = new mongoose.Schema(
  {
    title: String,
    questions: [questionSchema]
  }
)

surveySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Survey', surveySchema)