import { Generator } from '@/transformer/generator';
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
	z.nan(),
	z.record(z.string()), //`z.object` is just a subset of this - no need for a separate case.
	z.array(z.string()), //Tuples are just a subset of this - no need for a separate case.
	z.map(z.string(), z.string()),
	z.set(z.string()),
	z.promise(z.string()),
];

export const AnyGenerator = Generator({
	schema: ZodAny,
	output: ({ transform, context }) => {
		const shuffled = transform.utils.random.shuffle(POTENTIAL_SCHEMAS);
		for (const schema of shuffled) {
			try {
				return transform.from(schema, context);
			} catch (e) {
				/* empty */
			}
		}
		return {};
	},
});
