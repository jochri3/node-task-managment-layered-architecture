'use strict'

const Joi = require('joi')

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(null),
  start_date: Joi.date().iso().allow(null),
  end_date: Joi.date().iso().allow(null),
  user_id: Joi.number().integer(),
  parent_id: Joi.number().integer().allow(null),
  assignee_id: Joi.number().integer().allow(null),
  status: Joi.string().valid('todo', 'in_progress', 'completed')
}).min(1)

module.exports = updateTaskSchema
