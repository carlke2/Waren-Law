import { Body, Controller, Get, HttpCode, Post, Query, Redirect } from '@nestjs/common';
import {
  API_PREFIX,
  API_ROUTES,
  NEWSLETTER_CONFIRM_PATH,
  newsletterConfirmQuerySchema,
  newsletterRequestSchema,
} from '@waren/shared';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { NewsletterService } from './newsletter.service.js';

class NewsletterBody extends zodDto(newsletterRequestSchema) {}
class ConfirmQuery extends zodDto(newsletterConfirmQuerySchema) {}

const OK = 200;

@Controller(`${API_PREFIX}/${API_ROUTES.newsletter}`)
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}

  @Post()
  @HttpCode(OK)
  subscribe(@Body() body: NewsletterBody) {
    return this.newsletter.subscribe(body);
  }

  @Get(NEWSLETTER_CONFIRM_PATH)
  @Redirect()
  async confirm(@Query() query: ConfirmQuery) {
    return { url: await this.newsletter.confirm(query.token) };
  }
}
