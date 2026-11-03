import { Module } from '@nestjs/common';
import { WebinarsController } from './webinars.controller.js';
import { WebinarsService } from './webinars.service.js';

@Module({ controllers: [WebinarsController], providers: [WebinarsService] })
export class WebinarsModule {}
