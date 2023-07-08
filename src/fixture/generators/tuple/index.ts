import { Generator } from '@/transformer/generator';
import { ZodTuple } from 'zod';

export const TupleGenerator = Generator({
	schema: ZodTuple,
	output: ({ def, transform, context }) => {
		const known: unknown[] = [];

		def.items.forEach((type, idx) => {
			transform.utils.ifNotNever(type, (schema) => {
				known.push(transform.from(schema, { path: [...context.path, idx] }));
			});
		});

		const rest: unknown[] = [];

		transform.utils.ifNotNever(def.rest, (schema) => {
			transform.utils.n(
				(idx) =>
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					rest.push(
						transform.from(schema, {
							path: [...context.path, known.length + idx],
						})
					),
				1
			);
		});

		return [...known, ...rest];
	},
});
