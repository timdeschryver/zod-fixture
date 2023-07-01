import { Generator } from '@/transformer/generator';
import { ZodPromise } from 'zod';

export const PromiseGenerator = Generator({
	schema: ZodPromise,
	output: ({ def, transform, context }) =>
		Promise.resolve(transform.from(def.type, context)),
});
