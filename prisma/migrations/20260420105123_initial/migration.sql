-- CreateEnum
CREATE TYPE "Language" AS ENUM ('kk', 'ru', 'en');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');

-- CreateEnum
CREATE TYPE "StudyFormat" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('WRITING', 'READING', 'LISTENING', 'SPEAKING');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "name" TEXT,
    "birthday" TEXT,
    "nationality" TEXT,
    "workplace" TEXT,
    "address" TEXT,
    "telephone" TEXT,
    "language" "Language" NOT NULL,
    "level" "Level",
    "format" "StudyFormat",
    "updatedAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,
    "lessonType" "LessonType" NOT NULL,
    "content" TEXT,
    "updatedAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_userId_topicId_lessonType_key" ON "user_progress"("userId", "topicId", "lessonType");
