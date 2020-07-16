const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const quizOptionSchema = new mongoose.Schema(
  {
    option: { type: String, required: true },
    votes: { type: Number, required: true }
  }
)

const quizQuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    a: { type: quizOptionSchema, required: true },
    b: { type: quizOptionSchema, required: true },
    c: { type: quizOptionSchema, required: true },
    d: { type: quizOptionSchema, required: true },
    correct: { type: String, required: true, enum: ['a', 'b', 'c', 'd'] }
  }
)

const quizSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 3, required: true },
    questions: { type: [quizQuestionSchema], maxlength: 20, required: true },
    answers: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }
)

quizQuestionSchema.set('toJSON', {
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