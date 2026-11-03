import {
  CHANGE_ACTIONS,
  CONTENT_STATUSES,
  LEGAL_REVIEW_STATUSES,
  MEMBER_TYPES,
  OFFICE_TYPES,
  SLUG_TYPES,
  SUBSCRIBER_SOURCES,
  WEBINAR_STATES,
} from '@waren/shared';
import {
  ChangeAction,
  ContentStatus,
  LegalReviewStatus,
  MemberType,
  OfficeType,
  SlugType,
  SubscriberSource,
  WebinarState,
} from '../../prisma/generated/client.js';

describe('shared enums match the database enums', () => {
  it.each([
    ['ContentStatus', ContentStatus, CONTENT_STATUSES],
    ['LegalReviewStatus', LegalReviewStatus, LEGAL_REVIEW_STATUSES],
    ['MemberType', MemberType, MEMBER_TYPES],
    ['OfficeType', OfficeType, OFFICE_TYPES],
    ['WebinarState', WebinarState, WEBINAR_STATES],
    ['SlugType', SlugType, SLUG_TYPES],
    ['SubscriberSource', SubscriberSource, SUBSCRIBER_SOURCES],
    ['ChangeAction', ChangeAction, CHANGE_ACTIONS],
  ])('%s', (_name, databaseEnum, sharedValues) => {
    expect(Object.values(databaseEnum).sort()).toEqual([...sharedValues].sort());
  });
});
