/*
  Warnings:

  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tags" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToTags" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTags_AB_unique" ON "_ProductToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTags_B_index" ON "_ProductToTags"("B");

-- AddForeignKey
ALTER TABLE "_ProductToTags" ADD CONSTRAINT "_ProductToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTags" ADD CONSTRAINT "_ProductToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
