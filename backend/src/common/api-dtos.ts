import { slugParamsSchema } from '@waren/shared';
import { zodDto } from './zod-validation.pipe.js';

export class SlugParams extends zodDto(slugParamsSchema) {}
