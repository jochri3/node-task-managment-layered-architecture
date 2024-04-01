'use strict'

const express = require('express')
const createUserSchema = require('./schemas/create-user.schema')
const validateRequest = require('../middlewares/validation.middleware')
const updateUserSchema = require('./schemas/update-user.schema')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { UserService } = require('./users.service')
const UserController = require('./users.controller')
const errorWrapper = require('../middlewares/error-wrapper.middleware')

const userService = new UserService(prisma)
const userController = new UserController(userService)

const router = express.Router()

router.get('/', errorWrapper(userController.getAllUsers))
router.get('/:id', errorWrapper(userController.getUserById))
router.post(
  '/',
  validateRequest(createUserSchema),
  errorWrapper(userController.createUser)
)
router.patch(
  '/:id',
  validateRequest(updateUserSchema),
  errorWrapper(userController.updateUser)
)
router.delete('/:id', errorWrapper(userController.deleteUser))

module.exports = router
