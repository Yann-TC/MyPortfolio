import type { Response } from 'express';
import type { ZodType } from 'zod';

export function respondWithSchema<T>(res: Response, schema: ZodType<T>, data: T) {
  res.json(schema.parse(data));
}
