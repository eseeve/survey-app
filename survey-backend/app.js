const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

morgan.token('data', (req) => {
  if (req.method.toString() === 'POST')
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

module.exports = app