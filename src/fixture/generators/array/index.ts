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

		return transform.utils.n(
			(key) => transform.from(def.type, { path: [...context.path, key] }),
			{ min, max }
		);
	},
});
