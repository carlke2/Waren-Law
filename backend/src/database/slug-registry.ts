import type { Prisma, SlugType } from '../../prisma/generated/client.js';

export class SlugConflictError extends Error {
  constructor(readonly slug: string) {
    super(`Slug "${slug}" is already used by another page, practice area, insight or webinar`);
    this.name = 'SlugConflictError';
  }
}

type SlugClient = Pick<Prisma.TransactionClient, 'slug'>;

export interface SlugClaim {
  slug: string;
  type: SlugType;
  entityId: string;
}

export async function claimSlug(client: SlugClient, claim: SlugClaim): Promise<void> {
  const { slug, type, entityId } = claim;
  const holder = await client.slug.findUnique({ where: { slug } });
  if (holder && (holder.type !== type || holder.entityId !== entityId)) {
    throw new SlugConflictError(slug);
  }
  if (holder) return;
  await client.slug.deleteMany({ where: { type, entityId } });
  await client.slug.create({ data: { slug, type, entityId } });
}
