import { Generator } from '@/transformer/generator';
import { ZodLazy } from 'zod';

export const LazyGenerator = Generator({
	schema: ZodLazy,
	output: ({ def, transform, context }) =>
		transform.from(def.getter(), context),
});
