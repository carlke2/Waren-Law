import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { z } from 'zod';

interface ZodDtoClass {
  zodSchema: z.ZodType;
}

/**
 * Builds a class from a Zod schema so a controller can use it as a parameter type:
 * `list(@Query() query: ListQuery)` where `class ListQuery extends zodDto(schema) {}`.
 */
export function zodDto<T extends z.ZodType>(schema: T) {
  class Dto {
    static zodSchema = schema;
  }
  return Dto as unknown as { new (): z.output<T>; zodSchema: T };
}

function hasZodSchema(metatype: unknown): metatype is ZodDtoClass {
  return typeof metatype === 'function' && 'zodSchema' in metatype;
}

/** Global pipe: validates any body, query or param whose declared type came from `zodDto`. */
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    if (!hasZodSchema(metadata.metatype)) return value;
    const result = metadata.metatype.zodSchema.safeParse(value);
    if (result.success) return result.data;
    throw new BadRequestException({
      message: 'Validation failed',
      details: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }
}
