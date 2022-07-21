import type { ZodTypeAny, z } from 'zod';
import { generate } from './generate';

export function create<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
): z.infer<typeof schema> {
	return generate(schema, { path: [] });
}
