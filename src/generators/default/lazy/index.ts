import { Generator } from '@/core/generator';
import { ZodLazy } from 'zod';

export const LazyGenerator = Generator({
	schema: ZodLazy,
	output: ({ def, core, context }) => core.generate(def.getter(), context),
});
