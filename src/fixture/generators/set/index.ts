import { Generator } from '@/transformer/generator';
import type { z } from 'zod';
import { ZodSet } from 'zod';

export const SetGenerator = Generator({
	schema: ZodSet,
	output: ({ def, transform, context }) => {
		const min = def.minSize?.value ?? transform.defaults.set.min;
		const max = def.maxSize?.value ?? transform.defaults.set.max;

		const result = new Set<z.infer<typeof def.valueType>>();

		transform.utils.ifNotNever(def.valueType, (valueType) => {
			transform.utils.n(
				() => {
					result.add(
						transform.from(valueType, {
							path: [...context.path, result.size],
						})
					);
				},
				{ min, max }
			);
		});

		return result;
	},
});
