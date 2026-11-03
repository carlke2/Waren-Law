import { Injectable } from '@nestjs/common';
import { SEARCH_RESULT_LIMIT, type SearchResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';

type SearchRow = SearchResponse['results'][number];

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  // The to_tsvector expressions must match the GIN indexes in the add_search_indexes migration.
  async search(query: string): Promise<SearchResponse> {
    const results = await this.prisma.$queryRaw<SearchRow[]>`
      WITH search AS (SELECT websearch_to_tsquery('english'::regconfig, ${query}) AS terms)
      SELECT type, slug, title, excerpt, "hasProfile" FROM (
        SELECT 'insight' AS type, i.slug, i.title, i.excerpt, false AS "hasProfile",
          ts_rank(to_tsvector('english'::regconfig, i.title || ' ' || i.excerpt || ' ' || i."searchText"), s.terms) AS rank
        FROM "Insight" i, search s
        WHERE i.status = 'published' AND i."legalReviewStatus" = 'approved'
          AND to_tsvector('english'::regconfig, i.title || ' ' || i.excerpt || ' ' || i."searchText") @@ s.terms
        UNION ALL
        SELECT 'practice_area', p.slug, p.name, p."shortSummary", false,
          ts_rank(to_tsvector('english'::regconfig, p.name || ' ' || p."shortSummary" || ' ' || p."searchText"), s.terms)
        FROM "PracticeArea" p, search s
        WHERE p.status = 'published' AND p."legalReviewStatus" = 'approved'
          AND to_tsvector('english'::regconfig, p.name || ' ' || p."shortSummary" || ' ' || p."searchText") @@ s.terms
        UNION ALL
        SELECT 'team_member', t.slug, t."fullName", t."roleTitle", t."hasProfile",
          ts_rank(to_tsvector('english'::regconfig, t."fullName" || ' ' || t."roleTitle" || ' ' || t."shortBio" || ' ' || t."searchText"), s.terms)
        FROM "TeamMember" t, search s
        WHERE t.status = 'published'
          AND to_tsvector('english'::regconfig, t."fullName" || ' ' || t."roleTitle" || ' ' || t."shortBio" || ' ' || t."searchText") @@ s.terms
      ) matches
      ORDER BY rank DESC, slug ASC
      LIMIT ${SEARCH_RESULT_LIMIT}`;
    return { query, results };
  }
}
