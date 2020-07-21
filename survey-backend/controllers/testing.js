const router = require('express').Router()
const Survey = require('../models/survey')
const User = require('../models/user')
const Quiz = require('../models/quiz')

router.post('/reset', async (request, response) => {
  await Survey.deleteMany({})
  await Quiz.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/resetsurveys', async (request, response) => {
  await Survey.deleteMany({})
  await Quiz.deleteMany({})

  response.status(204).end()
})

module.exports = router