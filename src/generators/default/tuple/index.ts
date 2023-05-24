import { Generator } from '@/core/generator';
import { ZodTuple } from 'zod';

export const TupleGenerator = Generator({
	schema: ZodTuple,
	matches: () => true,
	output: ({ def, core, ctx }) => {
		const known = def.items.map((type, idx) =>
			core.generate(type, { path: [...ctx.path, idx] }),
		);
		const rest = def.rest
			? core.utils.n(
					idx => core.generate(def.rest!, { path: [...ctx.path, idx] }),
					1,
			  )
			: [];

		return [...known, ...rest];
	},
});
