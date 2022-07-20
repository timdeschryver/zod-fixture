import type { ZodTypeAny, z } from 'zod';
import {
	generateRandomDate,
	generateRandomNumber,
	generateSequenceBoolean,
	generateString,
} from './generators';

export function create<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
): z.infer<typeof schema> {
	const typeName = schema._def.typeName.toString();
	const zodTypeToGenerator = {
		ZodString: generateString,
		ZodNumber: generateRandomNumber,
		ZodBigInt: () => BigInt(generateRandomNumber()),
		ZodBoolean: generateSequenceBoolean,
		ZodDate: generateRandomDate,
		ZodNullable: () => create(schema._def.innerType),
		ZodOptional: () => create(schema._def.innerType),
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator();
}
