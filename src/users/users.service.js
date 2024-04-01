'use strict'

const NotFoundError = require('../errors/not-found.error')
const ConflictError = require('../errors/conflict.error')

class UserService {
  constructor(prisma) {
    this.prisma = prisma
  }

  getAllUsers = async () => {
    return this.prisma.users.findMany()
  }

  getUserById = async (userId) => {
    const user = await this.prisma.users.findUnique({
      where: { id: userId }
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }

  createUser = async (userData) => {
    const user = await this.prisma.users.findUnique({
      where: { email: userData.email }
    })
    if (user) {
      throw new ConflictError(
        `User with email ${userData.email} already exists.`
      )
    }
    return this.prisma.users.create({
      data: userData
    })
  }

  updateUser = async (userId, userData) => {
    const user = await this.prisma.users.findUnique({
      where: { id: userId }
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return this.prisma.users.update({
      where: { id: userId },
      data: { ...userData, updated_at: new Date() }
    })
  }

  deleteUser = async (userId) => {
    const user = await this.prisma.users.findUnique({
      where: { id: userId }
    })
    if (!user) {
      throw new NotFoundError('User not found')
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.users.delete({
        where: { id: userId }
      })
      await prisma.tasks.updateMany({
        where: { user_id: userId },
        data: { user_id: null }
      })
    })

    return true
  }
}

module.exports = {
  UserService
}
