const { TaskService } = require('./tasks.service')
const { PrismaClient } = require('@prisma/client')
const NotFoundError = require('../errors/not-found.error')

jest.mock('@prisma/client')

describe('TaskService', () => {
  let prisma
  let taskService

  beforeEach(() => {
    prisma = {
      tasks: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    }
    taskService = new TaskService(prisma)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllTasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Description 1' },
        { id: 2, title: 'Task 2', description: 'Description 2' }
      ]
      prisma.tasks.findMany.mockResolvedValueOnce(mockTasks)

      const result = await taskService.getAllTasks()

      expect(prisma.tasks.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockTasks)
    })
  })

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const taskId = 1
      const mockTask = {
        id: taskId,
        title: 'Task 1',
        description: 'Description 1'
      }
      prisma.tasks.findUnique.mockResolvedValueOnce(mockTask)

      const result = await taskService.getTaskById(taskId)

      expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      })
      expect(result).toEqual(mockTask)
    })

    it('should throw NotFoundError if task is not found', async () => {
      const taskId = 1
      prisma.tasks.findUnique.mockResolvedValueOnce(null)

      await expect(taskService.getTaskById(taskId)).rejects.toThrow(
        NotFoundError
      )
      expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      })
    })
  })

  describe('createTask', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'Task 1', description: 'Description 1' }
      const mockTask = { id: 1, ...taskData }
      prisma.tasks.create.mockResolvedValueOnce(mockTask)

      const result = await taskService.createTask(taskData)

      expect(prisma.tasks.create).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.create).toHaveBeenCalledWith({ data: taskData })
      expect(result).toEqual(mockTask)
    })
  })

  describe('updateTask', () => {
    it('should update a task', async () => {
      const taskId = 1
      const taskData = {
        title: 'Updated Task',
        description: 'Updated Description'
      }
      const mockTask = { id: taskId, ...taskData }
      prisma.tasks.findUnique.mockResolvedValueOnce({ id: taskId })
      prisma.tasks.update.mockResolvedValueOnce(mockTask)

      const result = await taskService.updateTask(taskId, taskData)

      expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      })
      expect(prisma.tasks.update).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: taskData
      })
      expect(result).toEqual(mockTask)
    })

    it('should throw NotFoundError if task is not found', async () => {
      const taskId = 1
      const taskData = {
        title: 'Updated Task',
        description: 'Updated Description'
      }
      prisma.tasks.findUnique.mockResolvedValueOnce(null)

      await expect(taskService.updateTask(taskId, taskData)).rejects.toThrow(
        NotFoundError
      )
      expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      })
      expect(prisma.tasks.update).not.toHaveBeenCalled()
    })
  })

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const taskId = 1
      const mockTask = { id: taskId }
      prisma.tasks.findUnique.mockResolvedValueOnce(mockTask)
      prisma.tasks.delete.mockResolvedValueOnce(mockTask)

      await taskService.deleteTask(taskId)

      expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      })
      expect(prisma.tasks.delete).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.delete).toHaveBeenCalledWith({
        where: { id: taskId }
      })
    })

    it('should throw NotFoundError if task is not found', async () => {
      const taskId = 1
      prisma.tasks.findUnique.mockResolvedValueOnce(null)

      await expect(taskService.deleteTask(taskId)).rejects.toThrow(
        NotFoundError
      )
      expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
        where: { id: taskId }
      })
      expect(prisma.tasks.delete).not.toHaveBeenCalled()
    })
  })
})
