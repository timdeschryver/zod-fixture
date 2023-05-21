import { Generator } from '@/core/generator';
import { ZodArray } from 'zod';

export const ArrayGenerator = Generator({
	schema: ZodArray,
	matches: () => true,
	output: ({ def, core }) => {
		const min = def.minLength?.value ?? core.defaults.array.min
		const max = def.maxLength?.value ?? core.defaults.array.max

		return core.utils.n(key => core.generate(def.type, { key }), { min, max})
	}
});
