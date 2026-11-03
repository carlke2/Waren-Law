import { Module } from '@nestjs/common';
import { ResolveController } from './resolve.controller.js';
import { ResolveService } from './resolve.service.js';

@Module({ controllers: [ResolveController], providers: [ResolveService] })
export class ResolveModule {}
