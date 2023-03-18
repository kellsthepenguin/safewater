/*
  Warnings:

  - A unique constraint covering the columns `[name,organizationIdx]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_organizationIdx_key" ON "Product"("name", "organizationIdx");
