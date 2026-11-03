import { Module } from '@nestjs/common';
import { PracticeAreasController } from './practice-areas.controller.js';
import { PracticeAreasService } from './practice-areas.service.js';

@Module({ controllers: [PracticeAreasController], providers: [PracticeAreasService] })
export class PracticeAreasModule {}
