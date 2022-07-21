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
	randomEnumValueGenerator,
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
		ZodTuple: () => {
			return schema._def.items.map((item: ZodTypeAny) =>
				generate(item, context),
			);
		},
		ZodLiteral: () => schema._def.value,
		ZodEnum: () => randomEnumValueGenerator(schema._def.values),
		ZodNativeEnum: () =>
			randomEnumValueGenerator(Object.keys(schema._def.values)),
		ZodUnion: () =>
			generate(
				randomEnumValueGenerator(schema._def.options) as ZodTypeAny,
				context,
			),
		ZodDiscriminatedUnion: () => {
			const options = schema._def.options as Map<string, ZodTypeAny>;
			return generate(
				randomEnumValueGenerator([...options.values()]) as ZodTypeAny,
				context,
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
