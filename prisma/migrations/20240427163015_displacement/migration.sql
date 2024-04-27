/*
  Warnings:

  - Added the required column `product_id` to the `displacement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "displacement" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "displacement" ADD CONSTRAINT "displacement_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
