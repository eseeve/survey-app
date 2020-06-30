const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Survey = require('../models/survey')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const surveys = await Survey
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(surveys.map(blog => blog.toJSON()))
})

router.get('/:id', async (request, response) => {
  const survey = await Survey.findById(request.params.id)
  if (survey) {
    response.json(survey.toJSON())
  } else {
    response.status(404).end()
  }
})

router.post('/', async (request, response) => {
  const survey = new Survey(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!survey.answers) {
    survey.answers = 0
    survey.questions.map(q => q.options.map(o => o.votes = 0))
  }

  survey.user = user
  const savedSurvey = await survey.save()

  user.surveys = user.surveys.concat(savedSurvey._id)
  await user.save()

  response.status(201).json(savedSurvey.toJSON())
})

router.put('/:id', async (request, response) => {
  const survey = request.body
  survey.user = survey.user.id

  const updatedSurvey = await Survey
    .findByIdAndUpdate(request.params.id, survey, { new: true })
    .populate('user')
  response.json(updatedSurvey.toJSON())
})

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const survey = await Survey.findById(request.params.id)
  if (survey.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete surveys' })
  }

  await survey.remove()
  user.surveys = user.surveys.filter(s => s.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

module.exports = router
