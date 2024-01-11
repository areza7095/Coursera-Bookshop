/*
  Warnings:

  - A unique constraint covering the columns `[isbn]` on the table `Books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Books_isbn_key` ON `Books`(`isbn`);
