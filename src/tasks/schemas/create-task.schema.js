'use strict'

const Joi = require('joi')

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(null).label('Description'),
  start_date: Joi.date().iso().allow(null).label('Start date'),
  end_date: Joi.date().iso().allow(null).label('End date'),
  user_id: Joi.number().integer().required(),
  parent_id: Joi.number().integer().allow(null).label('Parent id'),
  assignee_id: Joi.number().integer().allow(null),
  status: Joi.string()
    .valid('todo', 'in_progress', 'completed')
    .default('todo')
    .label('Status')
})

module.exports = createTaskSchema
