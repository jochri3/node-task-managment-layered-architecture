'use strict'

const express = require('express')
const validateRequest = require('../middlewares/validation.middleware')
const createTaskSchema = require('./schemas/create-task.schema')
const updateTaskSchema = require('./schemas/update-task.schema')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { TaskService } = require('./tasks.service')
const TaskController = require('./tasks.controller')
const errorWrapper = require('../middlewares/error-wrapper.middleware')

const taskService = new TaskService(prisma)
const taskController = new TaskController(taskService)

const router = express.Router()

router.get('/', errorWrapper(taskController.getAllTasks))
router.get('/:id', errorWrapper(taskController.getTaskById))
router.post(
  '/',
  validateRequest(createTaskSchema),
  errorWrapper(taskController.createTask)
)
router.patch(
  '/:id',
  validateRequest(updateTaskSchema),
  errorWrapper(taskController.updateTask)
)
router.delete('/:id', errorWrapper(taskController.deleteTask))

module.exports = router
