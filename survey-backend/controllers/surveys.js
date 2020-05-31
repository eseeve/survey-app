const surveysRouter = require('express').Router()
const Survey = require('../models/survey')

surveysRouter.get('/', async (request, response) => {
  const surveys = await Survey.find({})
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
  const savedSurvey = await survey.save()
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
