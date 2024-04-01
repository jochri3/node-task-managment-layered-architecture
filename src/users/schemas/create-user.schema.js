'use strict'

const Joi = require('joi')

const createUserSchema = Joi.object({
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  email: Joi.string().email().max(200).required()
})

module.exports = createUserSchema
