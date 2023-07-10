import { ZodLazy } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const LazyGenerator = Generator({
	schema: ZodLazy,
	output: ({ def, transform, context }) =>
		transform.from(def.getter(), context),
});
