import type { ZodTypeAny, z } from 'zod';
import { generate } from './generate';

export function create<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
	{ ignoreChecks = false }: { ignoreChecks?: boolean } = {},
): z.infer<typeof schema> {
	return generate(schema, { path: [], ignoreChecks });
}
