import { z } from 'zod';
import { DATABASE_STATES, HEALTH_STATUSES } from '../constants/health.js';

export const healthResponseSchema = z.object({
  status: z.enum(HEALTH_STATUSES),
  database: z.enum(DATABASE_STATES),
});
