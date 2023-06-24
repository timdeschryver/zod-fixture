import { Generator } from '@/core/generator';
import { ZodTuple } from 'zod';

export const TupleGenerator = Generator({
	schema: ZodTuple,
	output: ({ def, core, context }) => {
		const known = def.items.map((type, idx) =>
			core.generate(type, { path: [...context.path, idx] })
		);
		const rest = def.rest
			? core.utils.n(
					(idx) =>
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						core.generate(def.rest!, {
							path: [...context.path, known.length + idx],
						}),
					1
			  )
			: [];

		return [...known, ...rest];
	},
});
