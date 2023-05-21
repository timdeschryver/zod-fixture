import { Generator } from '@/core/generator';
import { ZodObject, ZodRecord } from 'zod';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	matches: () => true,
	output: ({ def, core }) => {
		const shape = def.shape();
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			const type = shape[key];
			if (type) result[key] = core.generate(type, { key });
		}

		return result;
	},
});

export const RecordGenerator = Generator({
	schema: ZodRecord,
	matches: () => true,
	output: ({ def, core }) => core.utils.n(() => core.generate(def.valueType)),
});
