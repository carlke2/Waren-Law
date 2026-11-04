-- AlterTable
ALTER TABLE "ContactSubmission" RENAME COLUMN "source" TO "page";
ALTER TABLE "ContactSubmission" ALTER COLUMN "message" SET DEFAULT '';
ALTER TABLE "ContactSubmission" ADD COLUMN     "form" TEXT NOT NULL DEFAULT 'contact',
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'direct',
ADD COLUMN     "campaign" TEXT,
ADD COLUMN     "channel" TEXT NOT NULL DEFAULT 'Direct',
ADD COLUMN     "heardAbout" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "practiceArea" TEXT,
ADD COLUMN     "clientType" TEXT,
ADD COLUMN     "preferredMeeting" TEXT,
ADD COLUMN     "preferredDates" TEXT;

-- AlterTable
ALTER TABLE "Subscriber" RENAME COLUMN "source" TO "signupType";
ALTER TABLE "Subscriber" ADD COLUMN     "form" TEXT NOT NULL DEFAULT 'newsletter',
ADD COLUMN     "page" TEXT NOT NULL DEFAULT '/',
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'direct',
ADD COLUMN     "campaign" TEXT,
ADD COLUMN     "channel" TEXT NOT NULL DEFAULT 'Direct',
ADD COLUMN     "heardAbout" TEXT;

-- CreateIndex
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "Subscriber_createdAt_idx" ON "Subscriber"("createdAt");
