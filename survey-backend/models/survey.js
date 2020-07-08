const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const optionSchema = new mongoose.Schema(
  {
    option: { type: String, required: true },
    custom: { type: Boolean, required: true , default: false },
    votes: { type: Number, required: true },
  }
)

const questionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ['MultipleChoice', 'Checkboxes'] },
    title: { type: String, minlength: 3, required: true },
    options: { type: [optionSchema], required: true },
    isOpen:  { type: Boolean, required: true , default: false },
  }
)

const surveySchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, required: true },
    questions: { type: [questionSchema], maxlength: 10, required: true },
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

surveySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Survey', surveySchema)