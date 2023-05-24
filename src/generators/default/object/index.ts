import { Generator } from '@/core/generator';
import { ZodObject, ZodRecord, z } from 'zod';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	matches: () => true,
	output: ({ def, core, ctx }) => {
		const shape = def.shape();
		const passthrough = def.unknownKeys === 'passthrough';
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			const type = shape[key];
			if (type) result[key] = core.generate(type, { path: [...ctx.path, key] });
		}

		if (passthrough) {
			const key = core.utils.lorem(1, 'word');
			result[key] = core.generate(z.any(), { path: [...ctx.path, key] });
		}

		return result;
	},
});

export const RecordGenerator = Generator({
	schema: ZodRecord,
	matches: () => true,
	output: ({ def, core, ctx }) => {
		const result: Record<
			z.infer<typeof def.keyType>,
			z.infer<typeof def.valueType>
		> = {};

		core.utils.n(() => {
			const key = core.generate(def.keyType, ctx) as string | number;
			const value = core.generate(def.valueType, { path: [...ctx.path, key] });

			result[key] = value;
		});

		return result;
	},
});
