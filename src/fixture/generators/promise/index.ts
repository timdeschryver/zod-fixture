import { ZodPromise } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const PromiseGenerator = Generator({
	schema: ZodPromise,
	output: ({ def, transform, context }) =>
		Promise.resolve(transform.from(def.type, context)),
});
