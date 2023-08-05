import type { TypeOf } from '@/internal/zod';
import { ZodAny, ZodObject, ZodRecord } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	output: ({ def, transform, context }) => {
		const shape = def.shape();
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			transform.utils.ifNotNever(shape[key], (schema) => {
				transform.utils.recursionCheck(schema, () => {
					result[key] = transform.fromSchema(schema, {
						...context,
						path: [...context.path, key],
					});
				});
			});
		}
		const passthrough =
			def.unknownKeys === 'passthrough' ||
			def.catchall._def.typeName !== 'ZodNever';

		if (passthrough) {
			const key = transform.utils.random.lorem(1, 'word');
			const type =
				def.catchall._def.typeName === 'ZodNever'
					? ZodAny.create()
					: def.catchall;
			result[key] = transform.fromSchema(type, {
				...context,
				path: [...context.path, key],
			});
		}

		return result;
	},
});

export const RecordGenerator = Generator({
	schema: ZodRecord,
	output: ({ def, transform, context }) => {
		const result: Record<
			TypeOf<typeof def.keyType>,
			TypeOf<typeof def.valueType>
		> = {};

		transform.utils.ifNotNever(def.keyType, (keyType) => {
			transform.utils.ifNotNever(def.valueType, (valueType) => {
				transform.utils.recursionCheck(valueType, () => {
					transform.utils.n(() => {
						const key = transform.fromSchema(keyType, context) as
							| string
							| number;
						const value = transform.fromSchema(valueType, {
							...context,
							path: [...context.path, key],
						});

						result[key] = value;
					});
				});
			});
		});

		return result;
	},
});
