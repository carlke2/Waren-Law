import { Module } from '@nestjs/common';
import { ContactModule } from '../contact/contact.module.js';
import { NewsletterController } from './newsletter.controller.js';
import { NewsletterMailer } from './newsletter-mailer.service.js';
import { NewsletterService } from './newsletter.service.js';

@Module({
  imports: [ContactModule],
  controllers: [NewsletterController],
  providers: [NewsletterService, NewsletterMailer],
})
export class NewsletterModule {}
