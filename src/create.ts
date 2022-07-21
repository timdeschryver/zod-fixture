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
	const typeName = schema._def.typeName;
	const zodTypeToGenerator: { [zodTypeName: string]: () => unknown } = {
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
		ZodObject: (): Record<string, unknown> => {
			const shape = schema._def.shape();
			return Object.entries<ZodTypeAny>(shape).reduce(
				(carry, [key, value]) => ({
					...carry,
					[key]: create(value),
				}),
				{} as Record<string, unknown>,
			);
		},
		ZodArray: (): unknown[] => {
			return Array.from({ length: 3 }, () => create(schema._def.type));
		},
		ZodNullable: () => create(schema._def.innerType),
		ZodOptional: () => create(schema._def.innerType),
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator();
}
