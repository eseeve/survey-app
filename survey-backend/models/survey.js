const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const optionSchema = new mongoose.Schema(
  {
    option: { type: String, required: true, minlength: 3 },
    votes: { type: Number, required: true },
  }
)

const questionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, minlength: 3, required: true },
    options: { type: [optionSchema], required: true },
  }
)

const surveySchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, required: true },
    questions: { type: [questionSchema], maxlength: 10, required: true },
    answers: { type: Number, required: true },
  }
)

optionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

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