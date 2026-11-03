import { Injectable } from '@nestjs/common';
import type { OfficeResponse } from '@waren/shared';
import type { Office } from '../../../prisma/generated/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { PUBLISHED } from '../content/visibility.js';

export function presentOffice(office: Office): OfficeResponse {
  return {
    slug: office.slug,
    name: office.name,
    type: office.type,
    addressLine: office.addressLine,
    building: office.building,
    city: office.city,
    country: office.country,
    poBox: office.poBox,
    phone: office.phone,
    email: office.email,
    latitude: office.latitude === null ? null : Number(office.latitude),
    longitude: office.longitude === null ? null : Number(office.longitude),
    mapEmbedUrl: office.mapEmbedUrl,
  };
}

@Injectable()
export class OfficesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<OfficeResponse[]> {
    const offices = await this.prisma.office.findMany({
      where: PUBLISHED,
      orderBy: { sortOrder: 'asc' },
    });
    return offices.map(presentOffice);
  }
}
