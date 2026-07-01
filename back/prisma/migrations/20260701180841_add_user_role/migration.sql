/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'customer');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" VARCHAR(48) NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'customer';
