// users.e2e.test.js
const request = require('supertest')
const app = require('../src/app')
const { PrismaClient } = require('@prisma/client')
const { users } = require('../seed-data')

const prisma = new PrismaClient()

describe('Users API', () => {
  beforeEach(async () => {
    await prisma.users.deleteMany({})
    await prisma.users.createMany({ data: users })
  })

  afterEach(async () => {
    await prisma.users.deleteMany({})
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Execution
      const response = await request(app).get('/api/users')

      // Assertion
      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(users.length)
      expect(response.body).toEqual(
        expect.arrayContaining(
          users.map((user) => expect.objectContaining(user))
        )
      )
    })
  })

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      // Setup
      const user = await prisma.users.findFirst()

      // Execution
      const response = await request(app).get(`/api/users/${user.id}`)

      // Assertion
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(user.id)
      expect(response.body.first_name).toBe(user.first_name)
      expect(response.body.last_name).toBe(user.last_name)
      expect(response.body.email).toBe(user.email)
      expect(response.body.created_at).toBe(user.created_at.toISOString())
      expect(response.body.updated_at).toBe(user.updated_at.toISOString())
    })

    it('should return 404 if user is not found', async () => {
      // Execution
      const response = await request(app).get('/api/users/999')

      // Assertion
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'User not found' })
    })
  })

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      // Setup
      const userData = {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com'
      }

      // Execution
      const response = await request(app).post('/api/users').send(userData)

      // Assertion
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(userData))
    })

    it('should return 400 if request data is invalid', async () => {
      // Setup
      const invalidUserData = {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'invalid-email'
      }

      // Execution
      const response = await request(app)
        .post('/api/users')
        .send(invalidUserData)

      // Assertion
      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        errors: [
          {
            field: 'email',
            message: 'email must be a valid email'
          }
        ]
      })
    })
  })

  describe('PATCH /api/users/:id', () => {
    it('should update a user', async () => {
      // Setup
      const user = await prisma.users.findFirst()
      const updatedUserData = {
        first_name: 'Updated First Name',
        last_name: 'Updated Last Name'
      }

      // Execution
      const response = await request(app)
        .patch(`/api/users/${user.id}`)
        .send(updatedUserData)

      // Assertion
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(updatedUserData))
    })

    it('should return 404 if user is not found', async () => {
      // Setup
      const updatedUserData = {
        first_name: 'Updated First Name',
        last_name: 'Updated Last Name'
      }

      // Execution
      const response = await request(app)
        .patch('/api/users/999')
        .send(updatedUserData)

      // Assertion
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'User not found' })
    })
  })

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      // Setup
      const user = await prisma.users.findFirst()

      // Execution
      const response = await request(app).delete(`/api/users/${user.id}`)

      // Assertion
      expect(response.status).toBe(204)
    })

    it('should return 404 if user is not found', async () => {
      // Execution
      const response = await request(app).delete('/api/users/999')

      // Assertion
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'User not found' })
    })
  })
})
