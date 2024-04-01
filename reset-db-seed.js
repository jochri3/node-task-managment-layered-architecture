'use strict'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { tasks, users } = require('./seed-data')

async function main() {
  console.log('Clearing existing data...')
  await prisma.tasks.deleteMany({})
  await prisma.users.deleteMany({})

  console.log('Seeding users...')
  for (const user of users) {
    await prisma.users.create({ data: user })
  }

  console.log('Seeding tasks...')
  for (const task of tasks) {
    await prisma.tasks.create({ data: task })
  }

  await prisma.$executeRaw`SELECT setval('tasks_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM tasks), false);`
  await prisma.$executeRaw`SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM users), false);`
  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
