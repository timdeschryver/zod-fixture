import { Generator } from '@/transformer/generator';
import { ZodPromise } from 'zod';

export const PromiseGenerator = Generator({
	schema: ZodPromise,
	output: ({ def, core, context }) =>
		Promise.resolve(core.generate(def.type, context)),
});
