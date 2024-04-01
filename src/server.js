const app = require('./app')
const prisma = require('./database')

const PORT = process.env.PORT || 3000
const MAX_RETRIES = 5
const RETRY_DELAY = 5000 // 5 seconds

async function startServer(retries = 0) {
  try {
    await prisma.$connect()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Error during server startup:', error)

    if (retries < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY}ms... (Attempt ${retries + 1})`)
      setTimeout(() => startServer(retries + 1), RETRY_DELAY)
    } else {
      console.error('Max retries reached. Shutting down.')
      await prisma.$disconnect()
      process.exit(1)
    }
  }
}

startServer()
