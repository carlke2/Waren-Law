-- AlterTable
ALTER TABLE "PracticeArea" ADD COLUMN     "cardSummary" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "cardTitle" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "icon" TEXT NOT NULL DEFAULT 'briefcase',
ADD COLUMN     "shortName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "confirmationTokenHash" TEXT,
ADD COLUMN     "confirmedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "heroImageId" TEXT NOT NULL,
    "heroVideoUrl" TEXT,
    "heroCards" JSONB NOT NULL,
    "pageH1" TEXT NOT NULL,
    "welcomeTitle" TEXT NOT NULL,
    "welcomeBody" JSONB NOT NULL,
    "welcomeCtaLabel" TEXT NOT NULL,
    "expertiseTitle" TEXT NOT NULL,
    "expertiseIntro" TEXT NOT NULL,
    "teamTitle" TEXT NOT NULL,
    "teamIntro" TEXT NOT NULL,
    "insightsTitle" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaBody" TEXT NOT NULL,
    "legalReviewStatus" "LegalReviewStatus" NOT NULL DEFAULT 'needs_advocate_review',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeContent_pageId_key" ON "HomeContent"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_confirmationTokenHash_key" ON "Subscriber"("confirmationTokenHash");

-- AddForeignKey
ALTER TABLE "HomeContent" ADD CONSTRAINT "HomeContent_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeContent" ADD CONSTRAINT "HomeContent_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Decision 0008: every table has row level security on.
ALTER TABLE "HomeContent" ENABLE ROW LEVEL SECURITY;

-- The hero image and video now live on HomeContent.
DELETE FROM "Setting" WHERE "key" = 'homeHero';
