import type { Condition, Context } from './context';
import type { ZodTypeAny, z } from 'zod';
import type { CustomizationRequest } from './customizations';
import { numberRandomizer } from './customizations';

export function generate<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
	context: Context,
): z.infer<typeof schema> {
	const requestFactory = extractFromZodSchema(schema);
	const request = requestFactory.createValue(context);
	const customization = context.customizations.find(c => c.condition(request));
	if (customization) {
		return customization.generator(request);
	}

	return null;
}

function extractFromZodSchema<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
): { type: string; createValue: (context: Context) => CustomizationRequest } {
	if (schema._def.innerType) {
		return extractFromZodSchema(schema._def.innerType);
	}

	const request = (
		type: string,
		requestProperties?: (context: Context) => Record<string, unknown>,
	): [string, (context: Context) => CustomizationRequest] => {
		return [
			type,
			(context): CustomizationRequest => {
				const checks = context.ignoreChecks ? {} : extractConditions(schema);
				const properties = requestProperties?.(context) ?? {};
				return {
					propertName: context.path[0],
					type,
					checks,
					...properties,
				};
			},
		];
	};

	const mapper: {
		[zodType: string]: () => [
			string,
			(context: Context) => CustomizationRequest,
		];
	} = {
		ZodString: () => request('string'),
		ZodNumber: () => request('number'),
		ZodBigInt: () => request('bigint'),
		ZodBoolean: () => request('boolean'),
		ZodObject: () =>
			request('object', (context): Record<string, unknown> => {
				const shape = Object.entries<ZodTypeAny>(schema._def.shape()).reduce(
					(aggregate, [key, value]) => {
						const map = extractFromZodSchema(value);
						return {
							...aggregate,
							[key]: {
								type: map.type,
								create: () =>
									generate(value, {
										...context,
										path: [key, ...context.path],
									}),
							},
						};
					},
					{} as Record<string, unknown>,
				);
				return {
					shape,
				};
			}),
		ZodDate: () => request('date'),
		ZodArray: () =>
			request('array', (context): Record<string, unknown> => {
				const { minLength, maxLength } = schema._def;
				let length = context.defaultLength;

				if (minLength !== null && maxLength !== null) {
					if (minLength.value > maxLength.value) {
						throw new Error(
							`min ${minLength} can't be greater max ${maxLength}`,
						);
					}
					length = numberRandomizer(minLength.value, maxLength.value);
				} else if (minLength !== null) {
					length = minLength.value;
				} else if (maxLength !== null) {
					length = maxLength.value;
				}

				return {
					length,
					create: () => generate(schema._def.type, context),
				};
			}),
		ZodSet: () =>
			request('set', context => {
				return {
					length: context.defaultLength,
					create: () => generate(schema._def.valueType, context),
				};
			}),
		ZodMap: () =>
			request('map', context => {
				const keyMap = extractFromZodSchema(schema._def.keyType);
				const valueMap = extractFromZodSchema(schema._def.valueType);

				return {
					length: context.defaultLength,
					keyType: keyMap.type,
					keyCreate: () => generate(schema._def.keyType, context),
					valueType: valueMap.type,
					valueCreate: () => generate(schema._def.valueType, context),
				};
			}),
		ZodRecord: () =>
			request('record', (context): Record<string, unknown> => {
				const keyMap = extractFromZodSchema(schema._def.keyType);
				const valueMap = extractFromZodSchema(schema._def.valueType);

				return {
					length: context.defaultLength,
					keyType: keyMap.type,
					keyCreate: () => generate(schema._def.keyType, context),
					valueType: valueMap.type,
					valueCreate: () => generate(schema._def.valueType, context),
				};
			}),
		ZodTuple: () =>
			request('tuple', context => {
				return {
					items: () =>
						schema._def.items.map(
							(item: ZodTypeAny) => extractFromZodSchema(item).type,
						),
					create: () =>
						schema._def.items.map((item: ZodTypeAny) =>
							generate(item, context),
						),
				};
			}),
		ZodEnum: () =>
			request(
				'enum',
				(): Record<string, unknown> => ({
					possibleValues: schema._def.values ?? [],
				}),
			),
		ZodNativeEnum: () =>
			request('enum', (): Record<string, unknown> => {
				/** See https://blog.oyam.dev/typescript-enum-values/ */
				const enumObject = schema._def.values;
				return {
					possibleValues: Object.keys(enumObject ?? {})
						.filter(key => Number.isNaN(Number(key)))
						.map(key => enumObject[key]),
				};
			}),
		ZodUnion: () =>
			request('union', (context): Record<string, unknown> => {
				return {
					possibleTypes: schema._def.options.map(
						(option: ZodTypeAny) => extractFromZodSchema(option).type,
					),
					create: (type: string): unknown => {
						const option = schema._def.options.find(
							(option: ZodTypeAny) =>
								extractFromZodSchema(option).type === type,
						);
						if (!option) {
							throw new Error(`Option with type ${type} does not exist`);
						}
						return generate(option, context);
					},
				};
			}),
		ZodDiscriminatedUnion: () =>
			request('union', (context): Record<string, unknown> => {
				const optionsMap = schema._def.options as Map<string, ZodTypeAny>;
				const options = [...optionsMap.values()];
				return {
					possibleTypes: options.map(
						(option: ZodTypeAny) => extractFromZodSchema(option).type,
					),
					create: (type: string): unknown => {
						const option = options.find(
							(option: ZodTypeAny) =>
								extractFromZodSchema(option).type === type,
						);
						if (!option) {
							throw new Error(`Option with type ${type} does not exist`);
						}
						return generate(option, context);
					},
				};
			}),
		ZodLiteral: () =>
			request(
				'literal',
				(): Record<string, unknown> => ({ value: schema._def.value }),
			),
		ZodNaN: () => request('NaN'),
		ZodNull: () => request('null'),
		ZodUndefined: () => request('undefined'),
		ZodVoid: () => request('void'),
		ZodFunction: () => request('function'),
		ZodAny: () => request('any'),
		ZodUnknown: () => request('unknown'),
		ZodNever: () => request('never'),
		ZodEffects: () =>
			request('effect', (context): Record<string, unknown> => {
				const innerType = extractFromZodSchema(schema._def.schema).type;

				return {
					effect: schema._def.effect,
					inner: {
						path: context.path,
						type: innerType,
						create: () => generate(schema._def.schema, context),
					},
				};
			}),
	};

	const zodToRequest = mapper[schema._def.typeName];
	if (!zodToRequest) {
		throw new Error(`Missing type for ZodType "${schema._def.typeName}"`);
	}

	const [type, createValue] = zodToRequest();
	return {
		type,
		createValue,
	};
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
				case 'length':
					return {
						...aggregate,
						['min']: check.value,
						['max']: check.value,
					} as Condition;
				case 'uuid':
					return {
						...aggregate,
						['uuid']: true,
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
