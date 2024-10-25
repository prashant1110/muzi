/*
  Warnings:

  - Added the required column `playedTimeStamp` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UpVote" DROP CONSTRAINT "UpVote_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playedTimeStamp" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "UpVote" ADD CONSTRAINT "UpVote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
