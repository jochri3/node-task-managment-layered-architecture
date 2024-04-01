'use strict'

const NotFoundError = require('../errors/not-found.error')
class TaskController {
  constructor(taskService) {
    this.taskService = taskService
  }

  getAllTasks = async (req, res, next) => {
    const tasks = await this.taskService.getAllTasks()
    res.json(tasks)
  }

  getTaskById = async (req, res) => {
    const taskId = Number.parseInt(req.params.id)
    const task = await this.taskService.getTaskById(taskId)
    res.json(task)
  }

  createTask = async (req, res, next) => {
    const taskData = req.body
    const newTask = await this.taskService.createTask(taskData)
    res.status(201).json(newTask)
  }

  updateTask = async (req, res, next) => {
    const taskId = Number.parseInt(req.params.id)
    const taskData = req.body
    const updatedTask = await this.taskService.updateTask(taskId, taskData)
    res.json(updatedTask)
  }

  deleteTask = async (req, res, next) => {
    const taskId = Number.parseInt(req.params.id)
    await this.taskService.deleteTask(taskId)
    res.sendStatus(204)
  }
}

module.exports = TaskController
