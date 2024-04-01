-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('todo', 'in_progress', 'completed');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMPTZ(6),
    "end_date" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "assignee_id" INTEGER,
    "status" "task_status" NOT NULL DEFAULT 'todo',

    CONSTRAINT "tasks_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tasks_assignee_id_index" ON "tasks"("assignee_id");

-- CreateIndex
CREATE INDEX "tasks_status_index" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_user_id_index" ON "tasks"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_pk_2" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_index" ON "users"("email");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tasks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_users_id_fk_2" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

