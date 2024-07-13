import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const UnionGenerator = Generator({
	schema: z.union([z.any(), z.any()]),
	output: ({ def, transform, context }) => {
		const type = transform.utils.random.from(def.options);

		return transform.fromSchema(type, context);
	},
});

export const DiscriminatedUnionGenerator = Generator({
	schema: z.discriminatedUnion('placeholder', [
		z.object({ placeholder: z.literal('placeholder') }),
	]),
	output: ({ def, transform, context }) => {
		const type = transform.utils.random.from(def.options);

		return transform.fromSchema(type, context);
	},
});
