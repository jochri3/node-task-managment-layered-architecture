'use strict'

const NotFoundError = require('../errors/not-found.error')

class TaskService {
  constructor(prisma) {
    this.prisma = prisma
  }

  getAllTasks = async () => {
    return this.prisma.tasks.findMany()
  }

  getTaskById = async (taskId) => {
    const task = await this.prisma.tasks.findUnique({
      where: { id: taskId }
    })
    if (!task) {
      throw new NotFoundError('Task not found')
    }
    return task
  }

  createTask = async (taskData) => {
    return this.prisma.tasks.create({
      data: taskData
    })
  }

  updateTask = async (taskId, taskData) => {
    const task = await this.prisma.tasks.findUnique({
      where: { id: taskId }
    })
    if (!task) {
      throw new NotFoundError('Task not found')
    }
    return this.prisma.tasks.update({
      where: { id: taskId },
      data: taskData
    })
  }

  deleteTask = async (taskId) => {
    const task = await this.prisma.tasks.findUnique({
      where: { id: taskId }
    })
    if (!task) {
      throw new NotFoundError('Task not found')
    }
    return this.prisma.tasks.delete({
      where: { id: taskId }
    })
  }
}

module.exports = {
  TaskService
}
