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
		ZodNullable: () => create(schema._def.innerType),
		ZodOptional: () => create(schema._def.innerType),
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator();
}
