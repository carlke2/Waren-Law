import { Global, Module } from '@nestjs/common';
import { parseEnv, type Env } from './env.schema.js';

export const ENV = Symbol('ENV');
export type { Env };

@Global()
@Module({
  providers: [{ provide: ENV, useFactory: (): Env => parseEnv(process.env) }],
  exports: [ENV],
})
export class ConfigModule {}
