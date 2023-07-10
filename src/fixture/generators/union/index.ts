import { ZodDiscriminatedUnion, ZodUnion } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

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
