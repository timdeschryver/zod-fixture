import { Generator } from '@/core/generator';
import { ZodTuple } from 'zod';

export const TupleGenerator = Generator({
	schema: ZodTuple,
	matches: () => true,
	output: ({ def, core }) => {
		const known = def.items.map(type => core.generate(type));
		const rest = def.rest ? core.utils.n(() => core.generate(def.rest!)) : [];

		return [...known, ...rest];
	},
});
