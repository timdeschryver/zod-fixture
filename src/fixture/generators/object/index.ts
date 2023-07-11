import { ZodAny, ZodObject, ZodRecord } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { z } from 'zod';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	output: ({ def, transform, context }) => {
		const shape = def.shape();
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			transform.utils.ifNotNever(shape[key], (schema) => {
				result[key] = transform.fromSchema(schema, {
					path: [...context.path, key],
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
			z.infer<typeof def.keyType>,
			z.infer<typeof def.valueType>
		> = {};

		transform.utils.ifNotNever(def.keyType, (keyType) => {
			transform.utils.ifNotNever(def.valueType, (valueType) => {
				transform.utils.n(() => {
					const key = transform.fromSchema(keyType, context) as string | number;
					const value = transform.fromSchema(valueType, {
						path: [...context.path, key],
					});

					result[key] = value;
				});
			});
		});

		return result;
	},
});
