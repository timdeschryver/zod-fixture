import { Generator } from '@/core/generator';
import type { z } from 'zod';
import { ZodSet } from 'zod';

export const SetGenerator = Generator({
	schema: ZodSet,
	matches: () => true,
	output: ({ def, core }) => {
		const min = def.minSize?.value ?? core.defaults.set.min;
		const max = def.maxSize?.value ?? core.defaults.set.max;

		const result = new Set<z.infer<typeof def.valueType>>();

		core.utils.n(
			() => {
				result.add(core.generate(def.valueType));
			},
			{ min, max },
		);

		return result;
	},
});
