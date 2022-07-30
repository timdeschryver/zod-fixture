import type { Condition, ConditionBasedGenerator, Context } from './context';
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

const default_length = 3;

export function generate<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
	context: Context,
): z.infer<typeof schema> {
	const typeName = schema._def.typeName;
	const conditions = context.ignoreChecks ? {} : extractConditions(schema);

	const zodTypeToGenerator: {
		[zodTypeName: string]: ConditionBasedGenerator;
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
			return Object.entries<ZodTypeAny>(shape).reduce(
				(aggregate, [key, value]) => {
					return {
						...aggregate,
						[key]: generate(value, {
							...context,
							path: [key, ...context.path],
						}),
					};
				},
				{} as Record<string, unknown>,
			);
		},
		ZodRecord: (): Record<string | number | symbol, unknown> => {
			return Array.from({ length: default_length }).reduce<
				Record<string | number | symbol, unknown>
			>(aggregate => {
				return {
					...aggregate,
					[generate(schema._def.keyType, context)]: generate(
						schema._def.valueType,
						context,
					),
				};
			}, {} as Record<string | number | symbol, unknown>);
		},
		ZodMap: (): Map<unknown, unknown> => {
			const map = new Map<unknown, unknown>();
			while (map.size < default_length) {
				map.set(
					generate(schema._def.keyType, context),
					generate(schema._def.valueType, context),
				);
			}
			return map;
		},
		ZodSet: (): Set<unknown> => {
			const set = new Set<unknown>();
			while (set.size < default_length) {
				set.add(generate(schema._def.valueType, context));
			}
			return set;
		},
		ZodArray: ({ min, max }: Condition): unknown[] => {
			let length = default_length;
			if (min !== undefined && max !== undefined) {
				length = generateRandomNumber({ min, max });
			} else if (min !== undefined) {
				length = min;
			} else if (max !== undefined) {
				length = max;
			}

			return Array.from({ length }, () => generate(schema._def.type, context));
		},
		ZodTuple: (): unknown[] => {
			return schema._def.items.map((item: ZodTypeAny) =>
				generate(item, context),
			);
		},
		ZodLiteral: () => schema._def.value,
		ZodEnum: (): unknown => randomEnumValueGenerator(schema._def.values),
		ZodNativeEnum: (): unknown =>
			randomEnumValueGenerator(Object.keys(schema._def.values)),
		ZodUnion: (): unknown =>
			generate(
				randomEnumValueGenerator(schema._def.options) as ZodTypeAny,
				context,
			),
		ZodDiscriminatedUnion: (): unknown => {
			const options = schema._def.options as Map<string, ZodTypeAny>;
			return generate(
				randomEnumValueGenerator([...options.values()]) as ZodTypeAny,
				context,
			);
		},
		ZodFunction: generateNoop,
		ZodEffects: () => {
			return generate(schema._def.schema, context);
		},
		ZodNullable: (): unknown => generate(schema._def.innerType, context),
		ZodOptional: (): unknown => generate(schema._def.innerType, context),
		ZodNaN: () => NaN,
	};

	const generator = zodTypeToGenerator[typeName];
	if (!generator) {
		throw new Error(`Missing generator for ZodType "${typeName}"`);
	}

	return generator(conditions);
}

function extractConditions<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
): Condition {
	const checks = [...(schema._def.checks || [])];
	if (schema._def.minLength) {
		checks.push({ kind: 'min', value: schema._def.minLength.value });
	}
	if (schema._def.maxLength) {
		checks.push({ kind: 'max', value: schema._def.maxLength.value });
	}

	const conditions = checks.reduce(
		(aggregate: Condition, check: Record<string, unknown>): Condition => {
			switch (check.kind) {
				case 'min':
					return {
						...aggregate,
						[check.kind]:
							(check.value as number) + (check.inclusive === false ? 1 : 0),
					} as Condition;
				case 'max':
					return {
						...aggregate,
						[check.kind]:
							(check.value as number) + (check.inclusive === false ? -1 : 0),
					} as Condition;
				default:
					return aggregate;
			}
		},
		{},
	);

	if (
		conditions.min !== undefined &&
		conditions.max !== undefined &&
		conditions.min > conditions.max
	) {
		throw new Error(
			`min (${conditions.min}) can't be greater than max (${conditions.max})`,
		);
	}
	return conditions;
}
