import { Module } from '@nestjs/common';
import { SlugRegistryService } from './slug-registry.service.js';

@Module({ providers: [SlugRegistryService], exports: [SlugRegistryService] })
export class SlugsModule {}
