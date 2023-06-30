import { Generator } from '@/transformer/generator';
import { ZodArray } from 'zod';

export const ArrayGenerator = Generator({
	schema: ZodArray,
	output: ({ def, core, context }) => {
		const min =
			def.minLength?.value ?? def.exactLength?.value ?? core.defaults.array.min;
		const max =
			def.maxLength?.value ?? def.exactLength?.value ?? core.defaults.array.max;

		return core.utils.n(
			(key) => core.generate(def.type, { path: [...context.path, key] }),
			{ min, max }
		);
	},
});
