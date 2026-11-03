import { Global, Module } from '@nestjs/common';
import { ContentPresenter } from './content-presenter.service.js';

@Global()
@Module({ providers: [ContentPresenter], exports: [ContentPresenter] })
export class ContentModule {}
