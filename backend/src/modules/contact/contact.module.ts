import { Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ENV, type Env } from '../../config/config.module.js';
import { ContactMailer, type MailTransport } from './contact-mailer.service.js';
import { MAIL_TRANSPORT } from './contact.constants.js';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

const DEFAULT_SMTP_PORT = 587;
const IMPLICIT_TLS_PORT = 465;

function createMailTransport(env: Env): MailTransport | null {
  if (!env.SMTP_HOST || !env.SMTP_FROM) return null;
  const port = env.SMTP_PORT ?? DEFAULT_SMTP_PORT;
  return createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === IMPLICIT_TLS_PORT,
    ...(env.SMTP_USER ? { auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } } : {}),
  });
}

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    ContactMailer,
    { provide: MAIL_TRANSPORT, inject: [ENV], useFactory: createMailTransport },
  ],
  exports: [MAIL_TRANSPORT],
})
export class ContactModule {}
