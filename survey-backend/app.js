const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const surveysRouter = require('./controllers/surveys')

const app = express()

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
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/surveys', surveysRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app