const router = require('express').Router()
const Survey = require('../models/survey')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Survey.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router