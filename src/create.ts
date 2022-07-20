import type { ZodTypeAny, z } from 'zod';
import {
	booleanGenerator,
	randomNumberGenerator,
	stringGenerator,
} from './primitives-generator';

export function create<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
): z.infer<typeof schema> {
	const typeName = schema._def.typeName.toString();
	const zodTypeToGenerator = {
		ZodString: stringGenerator,
		ZodNumber: randomNumberGenerator,
		ZodBoolean: booleanGenerator,
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator();
}
