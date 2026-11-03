import { Module } from '@nestjs/common';
import { AwardsController } from './awards.controller.js';
import { AwardsService } from './awards.service.js';

@Module({ controllers: [AwardsController], providers: [AwardsService] })
export class AwardsModule {}
