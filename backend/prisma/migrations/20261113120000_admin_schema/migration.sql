-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('admin', 'editor');

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('new', 'replied', 'handled');

-- CreateEnum
CREATE TYPE "MediaKind" AS ENUM ('image', 'video');

-- DropForeignKey
ALTER TABLE "ChangeHistory" DROP CONSTRAINT "ChangeHistory_adminUserId_fkey";

-- AlterTable
ALTER TABLE "HomeContent" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "featuredInMenu" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "homepageOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "showOnHomepage" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Insight" ADD COLUMN     "featuredInMenu" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featuredOnHome" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Webinar" ADD COLUMN     "featuredInMenu" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featuredOnHome" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "kind" "MediaKind" NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "handledAt" TIMESTAMP(3),
ADD COLUMN     "handledById" TEXT,
ADD COLUMN     "internalNote" TEXT,
ADD COLUMN     "status" "EnquiryStatus" NOT NULL DEFAULT 'new',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Existing enquiries take their submission time; Prisma sets updatedAt from here on.
UPDATE "ContactSubmission" SET "updatedAt" = "createdAt";
ALTER TABLE "ContactSubmission" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "disabledAt" TIMESTAMP(3),
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'editor';

ALTER TABLE "AdminUser" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ChangeHistory" ADD COLUMN     "summary" TEXT,
ALTER COLUMN "adminUserId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "adminUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_adminUserId_idx" ON "PasswordResetToken"("adminUserId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

-- CreateIndex
CREATE INDEX "ContactSubmission_status_createdAt_idx" ON "ContactSubmission"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "ContactSubmission" ADD CONSTRAINT "ContactSubmission_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "TeamMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactSubmission" ADD CONSTRAINT "ContactSubmission_handledById_fkey" FOREIGN KEY ("handledById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeHistory" ADD CONSTRAINT "ChangeHistory_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Decision 0008: RLS on, no policies.
ALTER TABLE "PasswordResetToken" ENABLE ROW LEVEL SECURITY;

-- Keep the public site as it was: these flags replace lists that were hard-coded in the frontend.
UPDATE "TeamMember" AS t SET "showOnHomepage" = true, "homepageOrder" = v.position
FROM (VALUES ('janice-wachuka', 1), ('ephraim-ndegwa', 2), ('martin-wachira', 3), ('phylis-njane', 4))
  AS v(slug, position)
WHERE t.slug = v.slug;

UPDATE "TeamMember" SET "featuredInMenu" = true
WHERE slug IN ('janice-wachuka', 'ephraim-ndegwa');

UPDATE "Webinar" SET "featuredOnHome" = true
WHERE slug = 'wealth-protection-plan-for-kenyans-abroad-webinar';

UPDATE "Webinar" SET "featuredInMenu" = true
WHERE slug IN (
  'trusts-taxes-protecting-wealth-across-borders',
  'wealth-protection-plan-for-kenyans-abroad-webinar',
  'wealth-built-abroad-protected-in-kenya-webinar'
);

UPDATE "HomeContent" AS h SET status = 'published', "publishedAt" = p."publishedAt"
FROM "Page" AS p
WHERE p.id = h."pageId";

UPDATE "Media" SET kind = 'video' WHERE "mimeType" LIKE 'video/%';
