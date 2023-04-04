-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `remarks` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `dob` VARCHAR(191) NULL,
    MODIFY `designation` VARCHAR(191) NULL,
    MODIFY `doj` VARCHAR(191) NULL,
    MODIFY `reportingManager` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `ctc` INTEGER NULL,
    MODIFY `resignDate` VARCHAR(191) NULL,
    MODIFY `leavingReason` VARCHAR(191) NULL,
    MODIFY `leavingDate` VARCHAR(191) NULL,
    MODIFY `employeeBehaviour` VARCHAR(191) NULL;
