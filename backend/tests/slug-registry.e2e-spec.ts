import { randomUUID } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client.js';
import { claimSlug, SlugConflictError } from '../src/database/slug-registry.js';

describe('claimSlug', () => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  const slug = `slug-test-${randomUUID()}`;
  const entityId = randomUUID();

  afterAll(async () => {
    await prisma.slug.deleteMany({ where: { slug: { startsWith: 'slug-test-' } } });
    await prisma.$disconnect();
  });

  it('registers a new slug and accepts a repeat by the same record', async () => {
    await claimSlug(prisma, { slug, type: 'insight', entityId });
    await claimSlug(prisma, { slug, type: 'insight', entityId });
    await expect(prisma.slug.count({ where: { slug } })).resolves.toBe(1);
  });

  it('rejects the same slug for another content type', async () => {
    await expect(
      claimSlug(prisma, { slug, type: 'page', entityId: randomUUID() }),
    ).rejects.toBeInstanceOf(SlugConflictError);
  });

  it('moves a record to its new slug and frees the old one', async () => {
    const renamed = `slug-test-${randomUUID()}`;
    await claimSlug(prisma, { slug: renamed, type: 'insight', entityId });
    await expect(prisma.slug.findUnique({ where: { slug } })).resolves.toBeNull();
    await expect(prisma.slug.count({ where: { slug: renamed } })).resolves.toBe(1);
  });
});
