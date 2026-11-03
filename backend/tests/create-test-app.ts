import type { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.setup.js';
import { MAIL_TRANSPORT } from '../src/modules/contact/contact.constants.js';
import type { MailTransport } from '../src/modules/contact/contact-mailer.service.js';

export async function createTestApp(
  mailTransport?: MailTransport,
): Promise<NestExpressApplication> {
  const builder = Test.createTestingModule({ imports: [AppModule] });
  if (mailTransport) builder.overrideProvider(MAIL_TRANSPORT).useValue(mailTransport);
  const moduleRef = await builder.compile();
  const app = moduleRef.createNestApplication<NestExpressApplication>({ logger: false });
  configureApp(app);
  await app.init();
  return app;
}
