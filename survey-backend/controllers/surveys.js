const surveysRouter = require('express').Router()
const Survey = require('../models/survey')

surveysRouter.get('/', async (request, response) => {
  const surveys = await Survey.find({})
  response.json(surveys.map(blog => blog.toJSON()))
})

surveysRouter.post('/', async (request, response) => {
  const survey = new Survey(request.body)
  const savedSurvey = await survey.save()
  response.status(201).json(savedSurvey.toJSON())
})

surveysRouter.delete('/:id', async (request, response) => {
  await Survey.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

module.exports = surveysRouter
