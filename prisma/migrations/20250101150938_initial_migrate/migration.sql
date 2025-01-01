/*
  Warnings:

  - A unique constraint covering the columns `[community_id]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Made the column `community_id` on table `Courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "community_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Courses_community_id_key" ON "Courses"("community_id");
