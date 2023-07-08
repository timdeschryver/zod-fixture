import { instance, ZodAny, ZodObject, ZodRecord } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { z } from 'zod';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	output: ({ def, transform, context }) => {
		const shape = def.shape();
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			const type = shape[key];
			if (type)
				result[key] = transform.from(type, { path: [...context.path, key] });
		}

		const passthrough =
			def.unknownKeys === 'passthrough' ||
			def.catchall._def.typeName !== 'ZodNever';

		if (passthrough) {
			const key = transform.utils.random.lorem(1, 'word');
			const type =
				def.catchall._def.typeName === 'ZodNever'
					? instance(ZodAny)
					: def.catchall;
			console.log({ type });
			result[key] = transform.from(type, { path: [...context.path, key] });
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

		transform.utils.n(() => {
			const key = transform.from(def.keyType, context) as string | number;
			const value = transform.from(def.valueType, {
				path: [...context.path, key],
			});

			result[key] = value;
		});

		return result;
	},
});
