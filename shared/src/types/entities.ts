import type { z } from 'zod';
import type {
  blockDocumentSchema,
  blockSchema,
  imageBlockSchema,
  inlineSchema,
} from '../schemas/blocks.js';
import type { faqItemSchema } from '../schemas/common.js';
import type * as entities from '../schemas/entities.js';

export type Inline = z.infer<typeof inlineSchema>;
export type Block = z.infer<typeof blockSchema>;
export type ImageBlock = z.infer<typeof imageBlockSchema>;
export type BlockDocument = z.infer<typeof blockDocumentSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;

export type Setting = z.infer<typeof entities.settingSchema>;
export type SlugRegistryEntry = z.infer<typeof entities.slugRegistrySchema>;
export type Office = z.infer<typeof entities.officeSchema>;
export type Page = z.infer<typeof entities.pageSchema>;
export type HomeContent = z.infer<typeof entities.homeContentSchema>;
export type PracticeArea = z.infer<typeof entities.practiceAreaSchema>;
export type TeamMember = z.infer<typeof entities.teamMemberSchema>;
export type Insight = z.infer<typeof entities.insightSchema>;
export type Category = z.infer<typeof entities.categorySchema>;
export type Webinar = z.infer<typeof entities.webinarSchema>;
export type ClientLogo = z.infer<typeof entities.clientLogoSchema>;
export type Partner = z.infer<typeof entities.partnerSchema>;
export type Award = z.infer<typeof entities.awardSchema>;
export type Testimonial = z.infer<typeof entities.testimonialSchema>;
export type Media = z.infer<typeof entities.mediaSchema>;
export type ContactSubmission = z.infer<typeof entities.contactSubmissionSchema>;
export type Subscriber = z.infer<typeof entities.subscriberSchema>;
export type Redirect = z.infer<typeof entities.redirectSchema>;
export type AdminUser = z.infer<typeof entities.adminUserSchema>;
export type Session = z.infer<typeof entities.sessionSchema>;
export type PasswordResetToken = z.infer<typeof entities.passwordResetTokenSchema>;
export type ChangeHistory = z.infer<typeof entities.changeHistorySchema>;
