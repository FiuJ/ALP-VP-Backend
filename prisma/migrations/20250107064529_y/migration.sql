-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "comment_date" DROP DEFAULT,
ALTER COLUMN "comment_date" SET DATA TYPE TEXT;
