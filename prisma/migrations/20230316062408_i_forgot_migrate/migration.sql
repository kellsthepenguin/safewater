-- CreateTable
CREATE TABLE "Organization" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "UnsuitableItem" (
    "idx" SERIAL NOT NULL,
    "lineName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "checkYear" INTEGER NOT NULL,
    "checkQuarter" TEXT NOT NULL,
    "organizationIdx" INTEGER,
    "productIdx" INTEGER,

    CONSTRAINT "UnsuitableItem_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Product" (
    "idx" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "organizationIdx" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "ScannedFiles" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ScannedFiles_name_key" ON "ScannedFiles"("name");

-- AddForeignKey
ALTER TABLE "UnsuitableItem" ADD CONSTRAINT "UnsuitableItem_organizationIdx_fkey" FOREIGN KEY ("organizationIdx") REFERENCES "Organization"("idx") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnsuitableItem" ADD CONSTRAINT "UnsuitableItem_productIdx_fkey" FOREIGN KEY ("productIdx") REFERENCES "Product"("idx") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_organizationIdx_fkey" FOREIGN KEY ("organizationIdx") REFERENCES "Organization"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;
