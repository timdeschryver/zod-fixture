import { Generator } from '@/transformer/generator';
import { ZodDiscriminatedUnion, ZodUnion } from 'zod';

export const UnionGenerator = Generator({
	schema: ZodUnion,
	output: ({ def, core, context }) => {
		const type = core.utils.random.from(def.options);

		return core.generate(type, context);
	},
});

export const DiscriminatedUnionGenerator = Generator({
	schema: ZodDiscriminatedUnion,
	output: ({ def, core, context }) => {
		const type = core.utils.random.from(def.options);

		return core.generate(type, context);
	},
});
