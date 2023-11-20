/*
  Warnings:

  - You are about to drop the column `password` on the `Client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" TEXT NOT NULL,
    "country" TEXT,
    "company" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Client" ("company", "country", "createdAt", "email", "firstName", "id", "lastName", "role", "updatedAt") SELECT "company", "country", "createdAt", "email", "firstName", "id", "lastName", "role", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
