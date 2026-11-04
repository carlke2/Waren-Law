import { Injectable } from '@nestjs/common';
import {
  LEAD_FORMS,
  type LeadListQuery,
  type LeadListResponse,
  type LeadRow,
  type LeadSummaryResponse,
} from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';

const SUBSCRIBER_FORM = 'newsletter';
const CSV_COLUMNS = [
  'createdAt',
  'form',
  'name',
  'email',
  'phone',
  'country',
  'channel',
  'source',
  'campaign',
  'heardAbout',
  'page',
] as const satisfies readonly (keyof LeadRow)[];
const FORMULA_START = /^[=+\-@\t\r]/;
const MONTH_LENGTH = 7;
const UNKNOWN_COUNTRY = 'Not given';

function csvCell(value: string | null): string {
  const text = value ?? '';
  // A leading quote stops spreadsheet programs running a visitor's text as a formula.
  const safe = FORMULA_START.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  private async rows(query: LeadListQuery): Promise<LeadRow[]> {
    const shared = {
      ...(query.channel ? { channel: query.channel } : {}),
      ...(query.source ? { source: query.source } : {}),
      ...(query.from || query.to
        ? {
            createdAt: {
              ...(query.from ? { gte: query.from } : {}),
              ...(query.to ? { lte: query.to } : {}),
            },
          }
        : {}),
    };
    const wantsSubscribers = (!query.form || query.form === SUBSCRIBER_FORM) && !query.country;
    const wantsEnquiries = query.form !== SUBSCRIBER_FORM;
    const [enquiries, subscribers] = await Promise.all([
      wantsEnquiries
        ? this.prisma.contactSubmission.findMany({
            where: {
              ...shared,
              ...(query.form ? { form: query.form } : {}),
              ...(query.country ? { country: query.country } : {}),
            },
          })
        : [],
      wantsSubscribers ? this.prisma.subscriber.findMany({ where: shared }) : [],
    ]);
    return [
      ...enquiries.map((row): LeadRow => ({
        id: row.id,
        createdAt: row.createdAt.toISOString(),
        form: row.form,
        name: row.name,
        email: row.email,
        phone: row.phone,
        country: row.country,
        channel: row.channel,
        source: row.source,
        campaign: row.campaign,
        heardAbout: row.heardAbout,
        page: row.page,
      })),
      ...subscribers.map((row): LeadRow => ({
        id: row.id,
        createdAt: row.createdAt.toISOString(),
        form: row.form,
        name: row.firstName,
        email: row.email,
        phone: null,
        country: null,
        channel: row.channel,
        source: row.source,
        campaign: row.campaign,
        heardAbout: row.heardAbout,
        page: row.page,
      })),
    ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async list(query: LeadListQuery): Promise<LeadListResponse> {
    const rows = await this.rows(query);
    const start = (query.page - 1) * query.pageSize;
    return {
      items: rows.slice(start, start + query.pageSize),
      page: query.page,
      pageSize: query.pageSize,
      total: rows.length,
      totalPages: Math.ceil(rows.length / query.pageSize),
    };
  }

  async csv(query: LeadListQuery): Promise<string> {
    const rows = await this.rows(query);
    return [
      CSV_COLUMNS.join(','),
      ...rows.map((row) => CSV_COLUMNS.map((column) => csvCell(row[column])).join(',')),
    ].join('\n');
  }

  async summary(query: LeadListQuery): Promise<LeadSummaryResponse> {
    const counts = new Map<string, LeadSummaryResponse['months'][number]>();
    for (const row of await this.rows(query)) {
      const month = row.createdAt.slice(0, MONTH_LENGTH);
      const country = row.country ?? UNKNOWN_COUNTRY;
      const entry = counts.get(month) ?? { month, total: 0, byChannel: {}, byCountry: {} };
      entry.total += 1;
      entry.byChannel[row.channel] = (entry.byChannel[row.channel] ?? 0) + 1;
      entry.byCountry[country] = (entry.byCountry[country] ?? 0) + 1;
      counts.set(month, entry);
    }
    return { forms: LEAD_FORMS, months: [...counts.values()] };
  }
}
