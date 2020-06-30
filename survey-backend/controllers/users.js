const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('surveys', { name: 1,  answers: 1 })
  response.json(users.map(u => u.toJSON()))
})

router.post('/', async (request, response) => {
  const { password, name, username } = request.body

  if ( !password || password.length < 5 ) {
    return response.status(400).send({
      error: 'password must have min length of 5'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

router.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = router