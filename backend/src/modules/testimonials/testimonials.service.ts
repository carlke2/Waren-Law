import { Injectable } from '@nestjs/common';
import type { TestimonialResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { PUBLISHED } from '../content/visibility.js';

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  async listApproved(): Promise<TestimonialResponse[]> {
    const testimonials = await this.prisma.testimonial.findMany({
      where: { ...PUBLISHED, consentConfirmed: true, approvedByFirm: true, visible: true },
      orderBy: { createdAt: 'desc' },
    });
    return testimonials.map(({ id, quote, attribution, location }) => ({
      id,
      quote,
      attribution,
      location,
    }));
  }
}
