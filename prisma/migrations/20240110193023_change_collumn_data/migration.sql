/*
  Warnings:

  - Changed the type of `cat_hab` on the `conductor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "conductor" DROP COLUMN "cat_hab",
ADD COLUMN     "cat_hab" INTEGER NOT NULL;
