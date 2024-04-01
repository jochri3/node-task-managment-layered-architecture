'use strict'

const NotFoundError = require('../errors/not-found.error')
const logger = require('../utils/logger')
const BadRequestError = require('../errors/bad-request.error')
const ConflictError = require('../errors/conflict.error')
const errorHandler = (err, req, res, next) => {
  // logger.log(err.stack)
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ error: err.message })
  } else if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ error: err.message })
  } else if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({ error: err.message })
  } else {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = errorHandler
