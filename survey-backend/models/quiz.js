const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const optionSchema = new mongoose.Schema(
  {
    option: { type: String, required: true },
    votes: { type: Number, required: true },
  }
)

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    options: { type: [optionSchema], required: true },
    correctIndex: { type: Number, required: true }
  }
)

const quizSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, required: true },
    questions: { type: [questionSchema], maxlength: 20, required: true },
    answers: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
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

quizSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Quiz', quizSchema)