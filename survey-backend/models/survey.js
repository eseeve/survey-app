const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const questionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, minlength: 3, required: true },
    options: { type: [String], required: true },
  }
)

const surveySchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, required: true },
    questions: { type: [questionSchema], required: true },
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