/*
  Warnings:

  - You are about to drop the column `externalMail` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `externalName` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "fechaCreacion" TEXT NOT NULL,
    "fechaReunion" TEXT NOT NULL,
    "tamanoEmpresa" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "clientId" TEXT,
    "clientName" TEXT NOT NULL,
    "clientMail" TEXT NOT NULL,
    "externalName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Meeting_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Meeting_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Meeting" ("clientId", "clientMail", "clientName", "createdAt", "description", "fechaCreacion", "fechaReunion", "id", "ownerId", "tamanoEmpresa", "updatedAt") SELECT "clientId", "clientMail", "clientName", "createdAt", "description", "fechaCreacion", "fechaReunion", "id", "ownerId", "tamanoEmpresa", "updatedAt" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
