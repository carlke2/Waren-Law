CREATE INDEX "Insight_search_idx" ON "Insight" USING GIN (to_tsvector('english'::regconfig, "title" || ' ' || "excerpt" || ' ' || "searchText"));
CREATE INDEX "PracticeArea_search_idx" ON "PracticeArea" USING GIN (to_tsvector('english'::regconfig, "name" || ' ' || "shortSummary" || ' ' || "searchText"));
CREATE INDEX "TeamMember_search_idx" ON "TeamMember" USING GIN (to_tsvector('english'::regconfig, "fullName" || ' ' || "roleTitle" || ' ' || "shortBio" || ' ' || "searchText"));
