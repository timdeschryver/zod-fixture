import { Generator } from '@/core/generator';
import { ZodAny, z } from 'zod';

const OPTIONS = [z.string(), z.number(), z.boolean(), z.undefined(), z.null()];

export const AnyGenerator = Generator({
	schema: ZodAny,
	matches: () => true,
	output: ({ core, ctx }) => core.generate(core.utils.randomFrom(OPTIONS), ctx),
});
