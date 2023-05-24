import { Generator } from '@/core/generator';
import { ZodArray } from 'zod';

export const ArrayGenerator = Generator({
	schema: ZodArray,
	matches: () => true,
	output: ({ def, core, ctx }) => {
		let min =
			def.minLength?.value ?? def.exactLength?.value ?? core.defaults.array.min;
		let max =
			def.maxLength?.value ?? def.exactLength?.value ?? core.defaults.array.max;

		return core.utils.n(
			key => core.generate(def.type, { path: [...ctx.path, key] }),
			{ min, max },
		);
	},
});
