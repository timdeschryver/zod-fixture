import type { ZodTypeAny, z } from 'zod';
import type { Customization } from './customization';
import { generate } from './generate';

export function create<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
	{ ignoreChecks = false, customizations = [] }: { ignoreChecks?: boolean, customizations?: Customization[] } = {},
): z.infer<typeof schema> {
	return generate(schema, { path: [], ignoreChecks, customizations });
}
