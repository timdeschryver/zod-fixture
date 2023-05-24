import { Generator } from '@/core/generator';
import { ZodAny, z } from 'zod';

const POTENTIAL_SCHEMAS = [
	z.undefined(),
	z.null(),
	z.boolean(),
	z.number(),
	z.string(),
	z.bigint(),
	z.date(),
	z.symbol(),
	z.unknown(),
	z.nan(),
	z.record(z.string()), //`z.object` is just a subset of this - no need for a separate case.
	z.array(z.string()), //Tuples are just a subset of this - no need for a separate case.
	z.map(z.string(), z.string()),
	z.set(z.string()),
	z.promise(z.string()),
];

export const AnyGenerator = Generator({
	schema: ZodAny,
	matches: () => true,
	output: ({ core, ctx }) =>
		core.generate(core.utils.randomFrom(POTENTIAL_SCHEMAS), ctx),
});
