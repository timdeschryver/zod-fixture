import { ZodTuple } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const TupleGenerator = Generator({
	schema: ZodTuple,
	output: ({ def, transform, context }) => {
		const known: unknown[] = [];

		def.items.forEach((type, idx) => {
			transform.utils.ifNotNever(type, (schema) => {
				transform.utils.recursionCheck(schema, () => {
					known.push(
						transform.fromSchema(schema, {
							...context,
							path: [...context.path, idx],
						})
					);
				});
			});
		});

		const rest: unknown[] = [];

		transform.utils.ifNotNever(def.rest, (schema) => {
			transform.utils.recursionCheck(schema, () => {
				transform.utils.n(
					(idx) =>
						rest.push(
							transform.fromSchema(schema, {
								...context,
								path: [...context.path, known.length + idx],
							})
						),
					1
				);
			});
		});

		return [...known, ...rest];
	},
});
