import type { ZodTypeAny, z } from 'zod';
import {
	generateNoop,
	generateNull,
	generateRandomBigInt,
	generateRandomDate,
	generateRandomNumber,
	generateSequenceBoolean,
	generateString,
	generateUndefined,
} from './generators';

export function create<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
): z.infer<typeof schema> {
	const typeName = schema._def.typeName.toString();
	const zodTypeToGenerator = {
		ZodString: generateString,
		ZodNumber: generateRandomNumber,
		ZodBigInt: generateRandomBigInt,
		ZodBoolean: generateSequenceBoolean,
		ZodDate: generateRandomDate,
		ZodNull: generateNull,
		ZodUndefined: generateUndefined,
		ZodVoid: generateNoop,
		ZodAny: generateNull,
		ZodUnknown: generateNull,
		ZodNever: generateNull,
		ZodNullable: () => create(schema._def.innerType),
		ZodOptional: () => create(schema._def.innerType),
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator();
}
