/*
  Warnings:

  - You are about to drop the column `logitude` on the `Address` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "logitude",
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;
