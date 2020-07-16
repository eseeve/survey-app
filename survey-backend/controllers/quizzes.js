const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Quiz = require('../models/quiz')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const quizzes = await Quiz
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(quizzes.map(s => s.toJSON()))
})

router.get('/:id', async (request, response) => {
  const quiz = await Quiz.findById(request.params.id)
  if (quiz) {
    response.json(quiz.toJSON())
  } else {
    response.status(404).end()
  }
})

router.post('/', async (request, response) => {
  const quiz = new Quiz(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!quiz.answers) {
    quiz.answers = 0
    quiz.questions.map(q => q.options.map(o => o.votes = 0))
  }

  quiz.user = user
  const savedQuiz = await quiz.save()

  user.quizzes = user.quizzes.concat(savedQuiz._id)
  await user.save()

  response.status(201).json(savedQuiz.toJSON())
})

router.put('/:id', async (request, response) => {
  const quiz = request.body
  quiz.user = quiz.user.id

  const updatedQuiz = await Quiz
    .findByIdAndUpdate(request.params.id, quiz, { new: true })
    .populate('user')
  response.json(updatedQuiz.toJSON())
})

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const quiz = await Quiz.findById(request.params.id)
  if (quiz.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete quizzes' })
  }

  await quiz.remove()
  user.quizzes = user.quizzes.filter(s => s.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

module.exports = router
