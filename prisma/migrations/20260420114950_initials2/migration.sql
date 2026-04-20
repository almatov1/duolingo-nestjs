/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationality` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workplace` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "birthday" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL,
ALTER COLUMN "workplace" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL;
