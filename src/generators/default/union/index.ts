import { Generator } from '@/core/generator';
import { ZodDiscriminatedUnion, ZodUnion } from 'zod';

export const UnionGenerator = Generator({
	schema: ZodUnion,
	test: () => true,
	output: ({ def, core }) => {
		const type = core.utils.randomFrom(def.options)

		return core.generate(type);
	},
});

export const DiscriminatedUnionGenerator = Generator({
	schema: ZodDiscriminatedUnion,
	test: () => true,
	output: ({ def, core }) => {
		const type = core.utils.randomFrom(def.options)

		return core.generate(type);
	}
})
