import { ZodLazy } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const LazyGenerator = Generator({
	schema: ZodLazy,
	output: ({ def, transform, context }) => {
		const count = transform.utils.recursion.get(def.getter) ?? 0;
		transform.utils.recursion.set(def.getter, count + 1);

		return transform.fromSchema(def.getter(), context);
	},
});
