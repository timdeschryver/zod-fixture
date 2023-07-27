import { ZodArray } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const ArrayGenerator = Generator({
	schema: ZodArray,
	output: ({ def, transform, context }) => {
		const userDefinedMin = def.minLength?.value ?? def.exactLength?.value;
		const userDefinedMax = def.maxLength?.value ?? def.exactLength?.value;

		const min = transform.utils.resolveValue({
			initial: userDefinedMin,
			fallback: transform.defaults.array.min,
			conflict: userDefinedMax,
			resolve: (options) => Math.min(options.fallback, options.conflict),
		});

		const max = transform.utils.resolveValue({
			initial: userDefinedMax,
			fallback: transform.defaults.array.max,
			conflict: userDefinedMin,
			resolve: (options) => Math.max(options.fallback, options.conflict),
		});

		const result: unknown[] = [];

		transform.utils.ifNotNever(def.type, (schema) => {
			transform.utils.recursionCheck(schema, () => {
				transform.utils.n(
					(key) =>
						result.push(
							transform.fromSchema(schema, {
								...context,
								path: [...context.path, key],
							})
						),
					{ min, max }
				);
			});
		});

		return result;
	},
});
