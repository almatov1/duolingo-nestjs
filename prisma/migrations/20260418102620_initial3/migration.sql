/*
  Warnings:

  - The values [C2] on the enum `Level` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Level_new" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');
ALTER TABLE "users" ALTER COLUMN "level" TYPE "Level_new" USING ("level"::text::"Level_new");
ALTER TYPE "Level" RENAME TO "Level_old";
ALTER TYPE "Level_new" RENAME TO "Level";
DROP TYPE "public"."Level_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "surname",
ADD COLUMN     "birthday" TEXT NOT NULL;
