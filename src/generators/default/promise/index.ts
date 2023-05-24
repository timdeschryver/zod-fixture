import { Generator } from '@/core/generator';
import { ZodPromise } from 'zod';

export const PromiseGenerator = Generator({
	schema: ZodPromise,
	matches: () => true,
	output: ({ def, core, ctx }) => Promise.resolve(core.generate(def.type, ctx)),
});
