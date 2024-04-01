const { UserService } = require('./users.service')
const { PrismaClient } = require('@prisma/client')
const NotFoundError = require('../errors/not-found.error')

jest.mock('@prisma/client')

describe('UserService', () => {
  let prisma
  let userService

  beforeEach(() => {
    prisma = {
      users: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      },
      tasks: {
        updateMany: jest.fn()
      },
      $transaction: jest.fn()
    }
    userService = new UserService(prisma)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com'
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane@example.com'
        }
      ]
      prisma.users.findMany.mockResolvedValueOnce(mockUsers)

      const result = await userService.getAllUsers()

      expect(prisma.users.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockUsers)
    })
  })

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const userId = 1
      const mockUser = {
        id: userId,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com'
      }
      prisma.users.findUnique.mockResolvedValueOnce(mockUser)

      const result = await userService.getUserById(userId)

      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      })
      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundError if user is not found', async () => {
      const userId = 1
      prisma.users.findUnique.mockResolvedValueOnce(null)

      await expect(userService.getUserById(userId)).rejects.toThrow(
        NotFoundError
      )
      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      })
    })
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com'
      }
      const mockUser = { id: 1, ...userData }
      prisma.users.create.mockResolvedValueOnce(mockUser)

      const result = await userService.createUser(userData)

      expect(prisma.users.create).toHaveBeenCalledTimes(1)
      expect(prisma.users.create).toHaveBeenCalledWith({ data: userData })
      expect(result).toEqual(mockUser)
    })
  })

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 1
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com'
      }
      const mockUser = { id: userId, ...userData }
      prisma.users.findUnique.mockResolvedValueOnce({ id: userId })
      prisma.users.update.mockResolvedValueOnce(mockUser)

      const result = await userService.updateUser(userId, userData)

      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      })
      expect(prisma.users.update).toHaveBeenCalledTimes(1)
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { ...userData, updated_at: expect.any(Date) }
      })
      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundError if user is not found', async () => {
      const userId = 1
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com'
      }
      prisma.users.findUnique.mockResolvedValueOnce(null)

      await expect(userService.updateUser(userId, userData)).rejects.toThrow(
        NotFoundError
      )
      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      })
      expect(prisma.users.update).not.toHaveBeenCalled()
    })
  })

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 1
      prisma.users.findUnique.mockResolvedValueOnce({ id: userId })
      prisma.$transaction.mockImplementationOnce(async (callback) => {
        await prisma.users.delete({ where: { id: userId } })
        await prisma.tasks.updateMany({
          where: { user_id: userId },
          data: { user_id: null }
        })
      })

      await userService.deleteUser(userId)

      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      })
      expect(prisma.$transaction).toHaveBeenCalledTimes(1)
    })

    it('should throw NotFoundError if user is not found', async () => {
      const userId = 1
      prisma.users.findUnique.mockResolvedValueOnce(null)

      await expect(userService.deleteUser(userId)).rejects.toThrow(
        NotFoundError
      )
      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      })
      expect(prisma.$transaction).not.toHaveBeenCalled()
    })
  })
})
