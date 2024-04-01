'use strict'
class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnprocessableEntityError'
    this.statusCode = 422
  }
}

module.exports = UnprocessableEntityError
