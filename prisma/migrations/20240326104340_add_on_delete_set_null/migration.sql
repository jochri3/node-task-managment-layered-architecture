-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_users_id_fk";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_users_id_fk_2";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_users_id_fk_2" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
