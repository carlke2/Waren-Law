import type { TeamSummary } from '@waren/shared';

export interface PhotoFile {
  file: string;
  width: number;
  height: number;
}

/** Square headshots used on the live profile pages. The member record keeps the team-card photo. */
export const PROFILE_PHOTO: Record<string, PhotoFile> = {
  'janice-wachuka': { file: 'team-janice-wachuka-profile.webp', width: 1600, height: 1601 },
  'ephraim-ndegwa': { file: 'team-ephraim-ndegwa-profile.webp', width: 1600, height: 1601 },
  'cecilia-njeri': { file: 'team-cecilia-njeri-profile.webp', width: 1600, height: 1601 },
};

/** Square speaker photos from the live webinar pages. */
export const SPEAKER_PHOTO: Record<string, PhotoFile> = {
  'janice-wachuka': { file: 'team-janice-wachuka-profile.webp', width: 1600, height: 1601 },
  'ephraim-ndegwa': { file: 'team-ephraim-ndegwa-speaker.webp', width: 1600, height: 1601 },
  'cecilia-njeri': { file: 'team-cecilia-njeri-speaker.webp', width: 1600, height: 1601 },
  'martin-wachira': { file: 'team-martin-wachira-speaker.webp', width: 1600, height: 1601 },
};

/** Team-card file when the stored portrait is a different crop. */
export const CARD_PHOTO: Record<string, PhotoFile> = {
  'cecilia-njeri': { file: 'team-cecilia-njeri-card.webp', width: 982, height: 1280 },
};

export function memberPhoto(member: TeamSummary, files?: Record<string, PhotoFile>) {
  const portrait = member.portrait;
  const extra = files?.[member.slug];
  if (!portrait || !extra) return portrait;
  return {
    url: portrait.url.replace(/[^/]+$/, extra.file),
    alt: portrait.alt,
    width: extra.width,
    height: extra.height,
  };
}
