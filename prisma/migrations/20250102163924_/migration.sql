/*
  Warnings:

  - Added the required column `isPublic` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;
