/*
  Warnings:

  - Added the required column `day` to the `Workouts_courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses_Users" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Workouts_courses" ADD COLUMN     "day" INTEGER NOT NULL;
