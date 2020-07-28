const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const surveysRouter = require('./controllers/surveys')
const quizzesRouter = require('./controllers/quizzes')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const mailRouter = require('./controllers/mail')

const app = express()

mongoose.set('useCreateIndex', true)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(express.static(path.resolve(__dirname, '../survey-frontend/build')))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/surveys', surveysRouter)
app.use('/api/quizzes', quizzesRouter)
app.use('/api/sendmail', mailRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app