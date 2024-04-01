# Project Name: Training on Node.js fundamentals

## Project Description

This project is a demonstration of a Node.js application using the Express framework that I built with student in a Fullstack bootcamp. 
It showcases the implementation of a RESTful API with CRUD operations for managing tasks and users using **layered architecture**. 
The project utilizes Prisma as the ORM (Object-Relational Mapping) tool for database management and provides integration tests to ensure the functionality of the API endpoints.

For this project, I didn't include authentication. The following features could be added:
- Swagger Docs
- JWT authentication
- Handling refresh token rotations using `redis`
- Using docker compose to launch `Redis` and `PostreSQL`. They were not used because at the moment I taught, the class didn't lean Docker.
- Adding a robust logging system.
- Handling audit trails

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- Node.js (version specified in the `volta` section of `package.json`)
- npm (Node Package Manager)
- PostgreSQL database

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd formation-nodejs-express
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:

    - Create a `.env` file in the project root directory.
    - Define the following variables in the `.env` file:
      ```
      DATABASE_URL=<your-database-url>
      ```
    - Create a `.env.test` file in the project root directory for the test environment.
    - Define the following variables in the `.env.test` file:
      ```
      DATABASE_URL=<your-test-database-url>
      ```

   Note: The test database should be created from the `test` schema.

## Prisma Commands

The project utilizes Prisma as the ORM tool. Here are some commonly used Prisma commands:

- `npx prisma generate`: Generates the Prisma client based on the Prisma schema.
- `npx prisma migrate dev`: Runs database migrations in the development environment.
- `npx prisma studio`: Opens the Prisma Studio interface for database management.

## Database Setup

To set up the database and seed it with initial data, follow these steps:

1. Run the database migrations:

   ```bash
   npm run migrate:test
   ```

   This command applies the database migrations defined in the Prisma schema to the test database.

2. Seed the database:

   ```bash
   npm run seed:db
   ```

   This command executes the `reset-db-seed.js` script to populate the database with initial data.

## Running the Application

To run the application, use the following command:

```bash
npm run start:dev
```

This command starts the application in development mode using Nodemon, which automatically restarts the server whenever changes are made to the source code.

To run the application in production mode, use the following command:

```bash
npm run start:prod
```

This command starts the application in production mode using the `NODE_ENV=prod` environment variable.

## Running Tests

To run the integration tests for the API endpoints, use the following command:

```bash
npm test
```

This command executes the test suite using Jest and runs the tests in a separate test database defined in the `.env.test` file.

## Code Formatting and Linting

The project uses Prettier for code formatting and @biomejs/biome for code linting. To format the code, run the following command:

```bash
npm run format
```

To check the code for linting errors and automatically apply fixes, run the following command:

```bash
npm run check
```

## Project Structure

The project follows a modular structure with separate directories for different components:

```bash
├── README.md
├── combined.log
├── config.js
├── e2e
│   ├── tasks.e2e.test.js
│   └── users.e2e.test.js
├── error.log
│   ├── migrations
│   │   ├── 0_init
│   │   │   └── migration.sql
│   │   ├── 20240326104340_add_on_delete_set_null
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── requests.http
├── reset-db-seed.js
├── seed-data.js
└── src
├── app.js
├── database.js
├── errors
│   ├── bad-request.error.js
│   ├── conflict.error.js
│   ├── forbidden.error.js
│   ├── not-found.error.js
│   ├── unauthorized.error.js
│   └── unprocessable-entity.error.js
├── middlewares
│   ├── error-wrapper.middleware.js
│   ├── error.middleware.js
│   ├── rate-limiter.middleware.js
│   └── validation.middleware.js
├── no-use-prisma.error.handling.js
├── server.js
├── tasks
│   ├── schemas
│   │   ├── create-task.schema.js
│   │   └── update-task.schema.js
│   ├── tasks.controller.js
│   ├── tasks.routes.js
│   ├── tasks.service.js
│   └── tasks.service.test.js
├── users
│   ├── schemas
│   │   ├── create-user.schema.js
│   │   └── update-user.schema.js
│   ├── users.controller.js
│   ├── users.routes.js
│   ├── users.service.js
│   └── users.service.test.js
└── utils
└── logger.js
```




## Contact

For any questions or inquiries, please contact [christian.lisangola@gmail.com](mailto:christian.lisangola@gmail.com).