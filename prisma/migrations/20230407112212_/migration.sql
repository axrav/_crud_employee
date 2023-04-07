/*
  Warnings:

  - You are about to alter the column `otp` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `otp` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `otp` INTEGER NULL;

-- AlterTable
ALTER TABLE `Employee` MODIFY `otp` INTEGER NULL;
