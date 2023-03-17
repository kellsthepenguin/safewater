/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_organizationIdx_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "organizationIdx" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_organizationIdx_fkey" FOREIGN KEY ("organizationIdx") REFERENCES "Organization"("idx") ON DELETE SET NULL ON UPDATE CASCADE;
