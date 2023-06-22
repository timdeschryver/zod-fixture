import { Generator } from '@/core/generator';
import { ZodDiscriminatedUnion, ZodUnion } from 'zod';

export const UnionGenerator = Generator({
	schema: ZodUnion,
	matches: () => true,
	output: ({ def, core, context }) => {
		const type = core.utils.randomFrom(def.options);

		return core.generate(type, context);
	},
});

export const DiscriminatedUnionGenerator = Generator({
	schema: ZodDiscriminatedUnion,
	matches: () => true,
	output: ({ def, core, context }) => {
		const type = core.utils.randomFrom(def.options);

		return core.generate(type, context);
	},
});
