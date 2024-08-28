/*
  Warnings:

  - Added the required column `updatedAt` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uniqueName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "tier" INTEGER NOT NULL DEFAULT 0,
    "credits" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Team" ("avatar", "id", "name", "uniqueName") SELECT "avatar", "id", "name", "uniqueName" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_uniqueName_key" ON "Team"("uniqueName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
