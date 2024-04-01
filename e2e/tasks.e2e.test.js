// tasks.e2e.test.js
const request = require('supertest')
const app = require('../src/app')
const { PrismaClient } = require('@prisma/client')
const { tasks, users } = require('../seed-data')

const prisma = new PrismaClient()

describe('Tasks API', () => {
  beforeEach(async () => {
    await prisma.tasks.deleteMany({})
    await prisma.users.deleteMany({})
    await prisma.users.createMany({ data: users })
    await prisma.tasks.createMany({ data: tasks })
  })

  afterEach(async () => {
    await prisma.tasks.deleteMany({})
    await prisma.users.deleteMany({})
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      // Execution
      const response = await request(app).get('/api/tasks')

      // Assertion
      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(tasks.length)
      expect(response.body).toEqual(
        expect.arrayContaining(
          tasks.map((task) => expect.objectContaining(task))
        )
      )
    })
  })

  describe('GET /api/tasks/:id', () => {
    it('should return a task by ID', async () => {
      // Setup
      const task = await prisma.tasks.findFirst()

      // Execution
      const response = await request(app).get(`/api/tasks/${task.id}`)

      // Assertion
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(task.id)
      expect(response.body.title).toBe(task.title)
      expect(response.body.description).toBe(task.description)
      expect(response.body.start_date).toBe(task.start_date.toISOString())
      expect(response.body.end_date).toBe(task.end_date.toISOString())
      expect(response.body.user_id).toBe(task.user_id)
      expect(response.body.parent_id).toBe(task.parent_id)
      expect(response.body.assignee_id).toBe(task.assignee_id)
      expect(response.body.status).toBe(task.status)
    })

    it('should return 404 if task is not found', async () => {
      // Execution
      const response = await request(app).get('/api/tasks/999')

      // Assertion
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'Task not found' })
    })
  })

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      // Setup
      const user = await prisma.users.findFirst()
      const taskData = {
        title: 'New Task',
        description: 'New Task Description',
        user_id: user.id
      }

      // Execution
      const response = await request(app).post('/api/tasks').send(taskData)

      // Assertion
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(taskData))
    })

    it('should return 400 if request data is invalid', async () => {
      // Setup
      const invalidTaskData = {
        description: 'Invalid Task'
      }

      // Execution
      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTaskData)

      // Assertion
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        errors: [
          {
            field: 'title',
            message: 'title is required'
          },
          {
            field: 'user_id',
            message: 'user_id is required'
          }
        ]
      })
    })
  })

  describe('PATCH /api/tasks/:id', () => {
    it('should update a task', async () => {
      // Setup
      const task = await prisma.tasks.findFirst()
      const updatedTaskData = {
        title: 'Updated Task Title',
        description: 'Updated Task Description'
      }

      // Execution
      const response = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send(updatedTaskData)

      // Assertion
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(updatedTaskData))
    })

    it('should return 404 if task is not found', async () => {
      // Setup
      const updatedTaskData = {
        title: 'Updated Task Title',
        description: 'Updated Task Description'
      }

      // Execution
      const response = await request(app)
        .patch('/api/tasks/999')
        .send(updatedTaskData)

      // Assertion
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'Task not found' })
    })
  })

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      // Setup
      const task = await prisma.tasks.findFirst()

      // Execution
      const response = await request(app).delete(`/api/tasks/${task.id}`)

      // Assertion
      expect(response.status).toBe(204)
    })

    it('should return 404 if task is not found', async () => {
      // Execution
      const response = await request(app).delete('/api/tasks/999')

      // Assertion
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'Task not found' })
    })
  })
})
