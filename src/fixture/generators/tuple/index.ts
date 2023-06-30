import { Generator } from '@/transformer/generator';
import { ZodTuple } from 'zod';

export const TupleGenerator = Generator({
	schema: ZodTuple,
	output: ({ def, transform, context }) => {
		const known = def.items.map((type, idx) =>
			transform.from(type, { path: [...context.path, idx] })
		);
		const rest = def.rest
			? transform.utils.n(
					(idx) =>
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						transform.from(def.rest!, {
							path: [...context.path, known.length + idx],
						}),
					1
			  )
			: [];

		return [...known, ...rest];
	},
});
