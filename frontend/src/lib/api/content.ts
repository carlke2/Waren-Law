import {
  API_ROUTES,
  awardResponseSchema,
  categoryResponseSchema,
  clientLogoResponseSchema,
  faqEntryResponseSchema,
  DEFAULT_PAGE_SIZE,
  INSIGHT_CATEGORY_PARAM,
  INSIGHT_PRACTICE_PARAM,
  homeResponseSchema,
  insightDetailSchema,
  insightListResponseSchema,
  officeResponseSchema,
  pageResponseSchema,
  partnerResponseSchema,
  practiceAreaDetailSchema,
  practiceAreaSummarySchema,
  redirectListResponseSchema,
  REDIRECTS_ALL_PATH,
  resolveResponseSchema,
  rootSlugsResponseSchema,
  searchResponseSchema,
  siteSettingsSchema,
  teamDetailSchema,
  teamListResponseSchema,
  testimonialResponseSchema,
  webinarDetailSchema,
  webinarSummarySchema,
  type WebinarSummary,
} from '@waren/shared';
import { z } from 'zod';
import { apiFetch, apiFetchOrNull } from './client';

const slugPath = (route: string, slug: string) => `${route}/${encodeURIComponent(slug)}`;

export const getSettings = () => apiFetch(API_ROUTES.settings, siteSettingsSchema);
export const getOffices = () => apiFetch(API_ROUTES.offices, z.array(officeResponseSchema));
export const getPage = (slug: string) =>
  apiFetchOrNull(slugPath(API_ROUTES.pages, slug), pageResponseSchema);
export const getPracticeAreas = () =>
  apiFetch(API_ROUTES.practiceAreas, z.array(practiceAreaSummarySchema));
export const getPracticeArea = (slug: string) =>
  apiFetchOrNull(slugPath(API_ROUTES.practiceAreas, slug), practiceAreaDetailSchema);
export const getTeam = (practiceArea?: string) =>
  apiFetch(
    practiceArea
      ? `${API_ROUTES.team}?practiceArea=${encodeURIComponent(practiceArea)}`
      : API_ROUTES.team,
    teamListResponseSchema,
  );
export const getTeamMember = (slug: string) =>
  apiFetchOrNull(slugPath(API_ROUTES.team, slug), teamDetailSchema);

interface InsightQuery {
  page?: number;
  pageSize?: number;
  category?: string;
  practiceArea?: string;
}

export const getInsights = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  category,
  practiceArea,
}: InsightQuery) => {
  const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  if (category) query.set(INSIGHT_CATEGORY_PARAM, category);
  if (practiceArea) query.set(INSIGHT_PRACTICE_PARAM, practiceArea);
  return apiFetch(`${API_ROUTES.insights}?${query}`, insightListResponseSchema);
};
export const getInsight = (slug: string) =>
  apiFetchOrNull(slugPath(API_ROUTES.insights, slug), insightDetailSchema);
export const getCategories = () => apiFetch(API_ROUTES.categories, z.array(categoryResponseSchema));
export const getWebinars = (state?: WebinarSummary['state']) =>
  apiFetch(
    state ? `${API_ROUTES.webinars}?state=${state}` : API_ROUTES.webinars,
    z.array(webinarSummarySchema),
  );
export const getWebinar = (slug: string) =>
  apiFetchOrNull(slugPath(API_ROUTES.webinars, slug), webinarDetailSchema);
export const getPartners = () => apiFetch(API_ROUTES.partners, z.array(partnerResponseSchema));
export const getAwards = () => apiFetch(API_ROUTES.awards, z.array(awardResponseSchema));
export const getTestimonials = () =>
  apiFetch(API_ROUTES.testimonials, z.array(testimonialResponseSchema));
export const getClientLogos = () =>
  apiFetch(API_ROUTES.clientLogos, z.array(clientLogoResponseSchema));
export const getFaqs = () => apiFetch(API_ROUTES.faqs, z.array(faqEntryResponseSchema));
export const getRootSlugs = () => apiFetch(API_ROUTES.resolve, rootSlugsResponseSchema);
export const resolveRootSlug = (slug: string) =>
  apiFetchOrNull(slugPath(API_ROUTES.resolve, slug), resolveResponseSchema);
export const searchContent = (query: string) =>
  apiFetch(`${API_ROUTES.search}?q=${encodeURIComponent(query)}`, searchResponseSchema);
export const getRedirects = () =>
  apiFetch(`${API_ROUTES.redirects}/${REDIRECTS_ALL_PATH}`, redirectListResponseSchema);
export const getHome = () => apiFetchOrNull(API_ROUTES.home, homeResponseSchema);
