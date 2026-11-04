import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  API_PREFIX,
  API_ROUTES,
  consultationRequestSchema,
  contactRequestSchema,
  recordingRequestSchema,
} from '@waren/shared';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { ContactService } from './contact.service.js';

class ContactBody extends zodDto(contactRequestSchema) {}
class ConsultationBody extends zodDto(consultationRequestSchema) {}
class RecordingBody extends zodDto(recordingRequestSchema) {}

const OK = 200;

@Controller(API_PREFIX)
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post(API_ROUTES.contact)
  @HttpCode(OK)
  submit(@Body() body: ContactBody) {
    return this.contact.submit(body);
  }

  @Post(API_ROUTES.consultation)
  @HttpCode(OK)
  consultation(@Body() body: ConsultationBody) {
    return this.contact.consultation(body);
  }

  @Post(API_ROUTES.recordingRequests)
  @HttpCode(OK)
  recording(@Body() body: RecordingBody) {
    return this.contact.recording(body);
  }
}
