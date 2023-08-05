import { ZodSet } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

import type { TypeOf } from '@/internal/zod';

export const SetGenerator = Generator({
	schema: ZodSet,
	output: ({ def, transform, context }) => {
		const userDefinedMin = def.minSize?.value;
		const userDefinedMax = def.maxSize?.value;

		const min = transform.utils.resolveValue({
			initial: userDefinedMin,
			fallback: transform.defaults.set.min,
			conflict: userDefinedMax,
			resolve: (options) => Math.min(options.fallback, options.conflict),
		});

		const max = transform.utils.resolveValue({
			initial: userDefinedMax,
			fallback: transform.defaults.set.max,
			conflict: userDefinedMin,
			resolve: (options) => Math.max(options.fallback, options.conflict),
		});

		const result = new Set<TypeOf<typeof def.valueType>>();

		transform.utils.ifNotNever(def.valueType, (valueType) => {
			transform.utils.recursionCheck(valueType, () => {
				transform.utils.n(
					() => {
						result.add(
							transform.fromSchema(valueType, {
								...context,
								path: [...context.path, result.size],
							}),
						);
					},
					{ min, max },
				);
			});
		});

		return result;
	},
});
