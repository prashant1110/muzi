-- AlterTable
ALTER TABLE "_UserSpaces" ADD CONSTRAINT "_UserSpaces_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserSpaces_AB_unique";
