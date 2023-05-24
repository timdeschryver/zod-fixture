import { Generator } from '@/core/generator';
import { ZodLazy } from 'zod';

export const LazyGenerator = Generator({
	schema: ZodLazy,
	matches: () => true,
	output: ({ def, core, ctx }) => core.generate(def.getter(), ctx),
});
