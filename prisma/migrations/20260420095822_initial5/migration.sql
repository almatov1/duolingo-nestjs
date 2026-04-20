/*
  Warnings:

  - You are about to drop the column `workPlace` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "workPlace",
ADD COLUMN     "workplace" TEXT;
