const surveysRouter = require('express').Router()
const Survey = require('../models/survey')
const User = require('../models/user')

surveysRouter.get('/', async (request, response) => {
  const surveys = await Survey
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(surveys.map(blog => blog.toJSON()))
})

surveysRouter.get('/:id', async (request, response) => {
  const survey = await Survey.findById(request.params.id)
  if (survey) {
    response.json(survey.toJSON())
  } else {
    response.status(404).end()
  }
})

surveysRouter.post('/', async (request, response) => {
  const survey = new Survey(request.body)

  const user = await User.findById(request.body.userId)
  survey.user = user._id

  const savedSurvey = await survey.save()
  user.surveys = user.surveys.concat(savedSurvey._id)
  await user.save()

  response.status(201).json(savedSurvey.toJSON())
})

surveysRouter.put('/:id', async (request, response) => {
  const survey = request.body
  const updatedSurvey = await Survey.findByIdAndUpdate(request.params.id, survey, { new: true })
  response.json(updatedSurvey.toJSON())
})

surveysRouter.delete('/:id', async (request, response) => {
  await Survey.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = surveysRouter
