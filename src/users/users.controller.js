'use strict'

const NotFoundError = require('../errors/not-found.error')

class UserController {
  constructor(userService) {
    this.userService = userService
  }

  getAllUsers = async (req, res, next) => {
    const users = await this.userService.getAllUsers()
    res.json(users)
  }

  getUserById = async (req, res, next) => {
    const userId = Number.parseInt(req.params.id)
    const user = await this.userService.getUserById(userId)
    res.json(user)
  }

  createUser = async (req, res, next) => {
    const userData = req.body
    const newUser = await this.userService.createUser(userData)
    res.status(201).json(newUser)
  }

  updateUser = async (req, res, next) => {
    const userId = Number.parseInt(req.params.id)
    const userData = req.body
    const updatedUser = await this.userService.updateUser(userId, userData)
    res.status(200).json(updatedUser)
  }

  deleteUser = async (req, res, next) => {
    const userId = Number.parseInt(req.params.id)
    await this.userService.deleteUser(userId)
    res.sendStatus(204)
  }
}

module.exports = UserController
