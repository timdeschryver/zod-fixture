import { Generator } from '@/transformer/generator';
import { ZodArray } from 'zod';

export const ArrayGenerator = Generator({
	schema: ZodArray,
	output: ({ def, transform, context }) => {
		const min =
			def.minLength?.value ??
			def.exactLength?.value ??
			transform.defaults.array.min;
		const max =
			def.maxLength?.value ??
			def.exactLength?.value ??
			transform.defaults.array.max;

		const result: unknown[] = [];

		transform.utils.ifNotNever(def.type, (schema) => {
			transform.utils.n(
				(key) =>
					result.push(transform.from(schema, { path: [...context.path, key] })),
				{ min, max }
			);
		});

		return result;
	},
});
