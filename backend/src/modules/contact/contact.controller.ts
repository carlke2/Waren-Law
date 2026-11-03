import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { API_PREFIX, API_ROUTES, contactRequestSchema } from '@waren/shared';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { ContactService } from './contact.service.js';

class ContactBody extends zodDto(contactRequestSchema) {}

const OK = 200;

@Controller(`${API_PREFIX}/${API_ROUTES.contact}`)
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post()
  @HttpCode(OK)
  submit(@Body() body: ContactBody) {
    return this.contact.submit(body);
  }
}
