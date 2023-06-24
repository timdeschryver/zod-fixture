import { Generator } from '@/core/generator';
import { ZodObject, ZodRecord, z } from 'zod';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	matches: () => true,
	output: ({ def, core, context }) => {
		const shape = def.shape();
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			const type = shape[key];
			if (type)
				result[key] = core.generate(type, { path: [...context.path, key] });
		}

		const passthrough =
			def.unknownKeys === 'passthrough' ||
			def.catchall._def.typeName !== 'ZodNever';

		if (passthrough) {
			const key = core.utils.random.lorem(1, 'word');
			const type =
				def.catchall._def.typeName === 'ZodNever' ? z.any() : def.catchall;
			result[key] = core.generate(type, { path: [...context.path, key] });
		}

		return result;
	},
});

export const RecordGenerator = Generator({
	schema: ZodRecord,
	matches: () => true,
	output: ({ def, core, context }) => {
		const result: Record<
			z.infer<typeof def.keyType>,
			z.infer<typeof def.valueType>
		> = {};

		core.utils.n(() => {
			const key = core.generate(def.keyType, context) as string | number;
			const value = core.generate(def.valueType, {
				path: [...context.path, key],
			});

			result[key] = value;
		});

		return result;
	},
});
