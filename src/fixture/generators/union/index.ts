import { Generator } from '@/transformer/generator';
import { ZodDiscriminatedUnion, ZodUnion } from 'zod';

export const UnionGenerator = Generator({
	schema: ZodUnion,
	output: ({ def, transform, context }) => {
		const type = transform.utils.random.from(def.options);

		return transform.from(type, context);
	},
});

export const DiscriminatedUnionGenerator = Generator({
	schema: ZodDiscriminatedUnion,
	output: ({ def, transform, context }) => {
		const type = transform.utils.random.from(def.options);

		return transform.from(type, context);
	},
});
