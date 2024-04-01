'use strict'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const tasksRoutes = require('./tasks/tasks.routes')
const usersRoutes = require('./users/users.routes')
const errorHandler = require('./middlewares/error.middleware')
const rateLimiter = require('./middlewares/rate-limiter.middleware')

const app = express()

app.use(
  cors({
    cors: 'http://localhost:8080'
  })
)
app.use(morgan('combined'))
app.use(express.json())
app.use(rateLimiter)

app.use('/api/tasks', tasksRoutes)
app.use('/api/users', usersRoutes)
app.use(errorHandler)

module.exports = app
