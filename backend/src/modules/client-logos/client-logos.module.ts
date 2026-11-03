import { Module } from '@nestjs/common';
import { ClientLogosController } from './client-logos.controller.js';
import { ClientLogosService } from './client-logos.service.js';

@Module({ controllers: [ClientLogosController], providers: [ClientLogosService] })
export class ClientLogosModule {}
