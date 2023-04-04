-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `doj` DATETIME(3) NOT NULL,
    `reportingManager` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `ctc` INTEGER NOT NULL,
    `resignDate` DATETIME(3) NOT NULL,
    `leavingReason` VARCHAR(191) NOT NULL,
    `leavingDate` DATETIME(3) NOT NULL,
    `employeeBehaviour` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
