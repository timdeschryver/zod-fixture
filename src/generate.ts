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
import type { Context } from './context';

export function generate<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
	context: Context,
): z.infer<typeof schema> {
	const typeName = schema._def.typeName;
	const zodTypeToGenerator: {
		[zodTypeName: string]: () => unknown;
	} = {
		ZodString: generateString(context.path[0]),
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
			return Object.entries<ZodTypeAny>(shape).reduce((carry, [key, value]) => {
				return {
					...carry,
					[key]: generate(value, {
						...context,
						path: [key, ...context.path],
					}),
				};
			}, {} as Record<string, unknown>);
		},
		ZodArray: (): unknown[] => {
			return Array.from({ length: 3 }, () =>
				generate(schema._def.type, context),
			);
		},
		ZodNullable: () => generate(schema._def.innerType, context),
		ZodOptional: () => generate(schema._def.innerType, context),
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator();
}
