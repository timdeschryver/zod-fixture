import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const LazyGenerator = Generator({
	schema: z.lazy(() => z.any()),
	output: ({ def, transform, context }) => {
		const count = transform.utils.recursion.get(def.getter) ?? 0;
		transform.utils.recursion.set(def.getter, count + 1);

		return transform.fromSchema(def.getter(), context);
	},
});
