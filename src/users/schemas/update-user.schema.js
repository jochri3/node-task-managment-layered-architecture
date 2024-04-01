'use strict'

const Joi = require('joi')

const updateUserSchema = Joi.object({
  first_name: Joi.string().max(50),
  last_name: Joi.string().max(50),
  email: Joi.string().email().max(200)
}).min(1)

module.exports = updateUserSchema
